#!/usr/bin/env node
/**
 * Build script for GitHub Profile README
 * Assembles template with data-driven, minified SVGs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { optimize } from 'svgo';
import { load } from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TEMPLATE = path.join(ROOT, 'templates', 'readme.template.md');
const OUTPUT = path.join(ROOT, 'README.md');
const SVG_DIR = path.join(ROOT, 'assets', 'svgs');
const DATA_FILE = path.join(ROOT, 'data', 'profile.yaml');
const TEMPLATE_SVG_DIR = path.join(ROOT, 'templates', 'svgs');

const DESIGN_TOKENS = {
  bg: '#0d1117',
  bgElevated: '#161b22',
  fg: '#e6edf3',
  fgMuted: '#8b949e',
  accent: '#00d9a5',
  accentDim: '#00b88a',
  warn: '#f0883e',
  error: '#f85149',
  border: '#30363d',
  glow: 'rgba(0, 217, 165, 0.15)',
  fontMono: 'JetBrains Mono, monospace',
  fontUI: 'Space Grotesk, sans-serif',
};

function readFile(filepath) {
  return fs.readFileSync(filepath, 'utf-8');
}

function writeFile(filepath, content) {
  fs.writeFileSync(filepath, content);
  console.log(`✓ Written: ${path.relative(ROOT, filepath)}`);
}

function loadYaml(filepath) {
  const content = readFile(filepath);
  return load(content);
}

function parseKeyValue(line, obj) {
  const [key, ...rest] = line.split(':');
  const value = rest.join(':').trim();
  const currentKey = key.trim();

  if (value.startsWith('"') && value.endsWith('"')) {
    obj[currentKey] = value.slice(1, -1);
  } else if (value === '') {
    obj[currentKey] = {};
  } else if (!isNaN(value) && value !== '') {
    obj[currentKey] = Number(value);
  } else {
    obj[currentKey] = value;
  }
}

function loadTemplateSvg(name) {
  const filepath = path.join(TEMPLATE_SVG_DIR, `${name}.svg`);
  if (!fs.existsSync(filepath)) {
    console.warn(`⚠ Template SVG not found: ${filepath}`);
    return `<!-- ${name}.svg not found -->`;
  }
  return readFile(filepath);
}

function loadFontsCss() {
  const filepath = path.join(ROOT, 'assets', 'fonts.css');
  if (!fs.existsSync(filepath)) return '';
  return readFile(filepath);
}

function minifySvg(svgContent) {
  const result = optimize(svgContent, {
    multipass: true,
    plugins: [
      'removeDoctype',
      'removeXMLProcInst',
      'removeComments',
      'removeMetadata',
      'removeTitle',
      'removeDesc',
      'removeUselessDefs',
      'cleanupAttrs',
      'cleanupEnableBackground',
      'convertColors',
      'convertPathData',
      'convertTransform',
      'removeUnknownsAndDefaults',
      'removeNonInheritableGroupAttrs',
      'removeUselessStrokeAndFill',
      'cleanupNumericValues',
      'cleanupListOfValues',
      'moveElemsAttrsToGroup',
      'moveGroupAttrsToElems',
      'collapseGroups',
      'removeEmptyAttrs',
      'removeEmptyContainers',
      'mergePaths',
      'convertShapeToPath',
      'sortAttrs',
      'removeDimensions',
      'removeScriptElement',
      'removeStyleElement',
      'prefixIds',
    ],
    js2svg: { pretty: false, indent: 0 },
  });
  return result.data;
}

function writeSvgFile(name, svgContent) {
  const filepath = path.join(SVG_DIR, `${name}.svg`);
  writeFile(filepath, svgContent);
  return `assets/svgs/${name}.svg`;
}

function renderTemplate(template, data) {
  return template.replace(/\{\{([^}]+)\}\}/g, (match, expr) => {
    const trimmed = expr.trim();

    // Helper functions
    if (trimmed.startsWith('add ')) {
      const parts = trimmed.slice(4).split(' ');
      const a = parseFloat(resolveValue(parts[0], data));
      const b = parseFloat(resolveValue(parts[1], data));
      return String(a + b);
    }
    if (trimmed.startsWith('mul ')) {
      const parts = trimmed.slice(4).split(' ');
      const a = parseFloat(resolveValue(parts[0], data));
      const b = parseFloat(resolveValue(parts[1], data));
      return String(a * b);
    }
    if (trimmed.startsWith('eq ')) {
      const parts = trimmed.slice(3).split(' ');
      const a = resolveValue(parts[0], data);
      const b = resolveValue(parts[1], data);
      return String(a === b);
    }
    if (trimmed.startsWith('length ')) {
      const path = trimmed.slice(7).trim();
      const arr = resolveValue(path, data);
      return String(Array.isArray(arr) ? arr.length : 0);
    }

    return resolveValue(trimmed, data);
  });
}

function resolveValue(path, data) {
  const keys = path.split('.');
  let value = data;
  for (const k of keys) {
    value = value?.[k];
  }
  return value !== undefined ? value : '';
}

function renderSvgTemplate(template, data, tokens) {
  // First pass: expand {{#each}} blocks before processing placeholders
  let rendered = template.replace(/\{\{#each (\w+(?:\.\w+)*)\}\}([\s\S]*?)\{\{\/each\}\}/g, (match, arrayPath, itemTemplate) => {
    const keys = arrayPath.split('.');
    let arr = data;
    for (const k of keys) {
      arr = arr?.[k];
    }
    arr = arr || [];
    if (!Array.isArray(arr)) arr = [];
    return arr.map((item, i) => renderTemplate(itemTemplate, { ...item, ...tokens, index: i })).join('');
  });

  // Second pass: process remaining {{placeholders}} on the fully expanded template
  rendered = renderTemplate(rendered, { ...data, ...tokens });
  return rendered;
}

function enrichData(data) {
  const enriched = { ...data };

  // Pre-compute tech stack animation values
  if (enriched.tech_stack) {
    const ts = enriched.tech_stack;

    if (ts.languages) {
      ts.languages = ts.languages.map((item, index) => ({
        ...item,
        _animDelay: (0.15 + index * 0.05).toFixed(2),
        _yPos: 116 + index * 24,
        _yFrom: 10 + index * 24,
        _textColor: item.icon === 'JS' ? '#000' : '#fff',
      }));
    }
    if (ts.frontend) {
      ts.frontend = ts.frontend.map((item, index) => ({
        ...item,
        _animDelay: (0.5 + index * 0.05).toFixed(2),
        _yPos: 292 + index * 24,
        _yFrom: 10 + index * 24,
        _textColor: item.icon === 'N' ? '#000' : '#fff',
      }));
    }
    if (ts.tools) {
      ts.tools = ts.tools.map((item, index) => ({
        ...item,
        _animDelay: (0.7 + index * 0.05).toFixed(2),
        _yPos: 396 + index * 24,
        _yFrom: 10 + index * 24,
      }));
    }
  }

  // Pre-compute about config animation values
  const focusLen = enriched.current_focus?.length || 0;
  const socialLen = enriched.social_links?.length || 0;

  enriched._focusLen = focusLen;
  enriched._socialLen = socialLen;
  enriched._focusLines = enriched.current_focus?.map((item, index) => ({
    text: item,
    lineNum: 5 + index,
    animDelay: (0.3 + index * 0.05).toFixed(2),
    yPos: 96 + index * 24,
    yFrom: -15 + index * 24,
  })) || [];

  enriched._interestLines = enriched.social_links?.map((item, index) => ({
    label: item.label,
    lineNum: 13 + index,
    animDelay: (0.7 + index * 0.05).toFixed(2),
    yPos: 60 + index * 24,
    yFrom: -15 + index * 24,
  })) || [];

  enriched._interestsLabelLine = focusLen + 5;
  enriched._interestsLabelDelay = (0.45 + focusLen * 0.05).toFixed(2);
  enriched._interestsLabelY = 96 + focusLen * 24;
  enriched._interestsLabelYFrom = -15 + focusLen * 24;

  enriched._vimLine = focusLen + 13;
  enriched._vimY = 120 + focusLen * 24;
  enriched._vimYFrom = -15 + focusLen * 24;

  enriched._cursorLine = focusLen + 14;
  enriched._cursorY = 144 + focusLen * 24;
  enriched._cursorYFrom = -15 + focusLen * 24;

  return enriched;
}

function build() {
  console.log('Building README...\n');

  const rawData = loadYaml(DATA_FILE);
  const data = enrichData(rawData);
  let template = readFile(TEMPLATE);

  const svgTemplates = {
    header: loadTemplateSvg('header-boot'),
    social: loadTemplateSvg('social-links'),
    techStack: loadTemplateSvg('tech-stack-files'),
    about: loadTemplateSvg('about-config'),
    snake: loadTemplateSvg('snake-game'),
    footer: loadTemplateSvg('footer-shutdown'),
  };

  // Render and write each SVG to assets/svgs/, get markdown image references
  // Use GIFs for complex animations (header, snake, footer), SVGs for others
  const svgOutputs = {};
  for (const [key, svgTemplate] of Object.entries(svgTemplates)) {
    const rendered = renderSvgTemplate(svgTemplate, data, DESIGN_TOKENS);
    const minified = minifySvg(rendered);
    const filepath = writeSvgFile(key, minified);
    // Map template keys to placeholder names
    const placeholderKey = key === 'techStack' ? 'SVG_TECH_STACK' : `SVG_${key.toUpperCase()}`;

    // Use GIF for complex animations, SVG for static/interactive ones
    if (key === 'header') {
      svgOutputs[placeholderKey] = `![${key}](assets/svgs/header-boot.gif)`;
    } else if (key === 'snake') {
      svgOutputs[placeholderKey] = `![${key}](assets/svgs/snake-game.gif)`;
    } else if (key === 'footer') {
      svgOutputs[placeholderKey] = `![${key}](assets/svgs/footer-shutdown.gif)`;
    } else {
      svgOutputs[placeholderKey] = `![${key}](${filepath})`;
    }
  }

  // No FONTS_CSS - GitHub doesn't support <style> blocks
  const replacements = svgOutputs;

  for (const [key, value] of Object.entries(replacements)) {
    const placeholder = `{{${key}}}`;
    if (template.includes(placeholder)) {
      template = template.replaceAll(placeholder, value);
      console.log(`  ✓ Injected {{${key}}}`);
    } else {
      console.warn(`  ⚠ Placeholder {{${key}}} not found in template`);
    }
  }

  writeFile(OUTPUT, template);
  console.log('\n✅ Build complete!');
}

build();