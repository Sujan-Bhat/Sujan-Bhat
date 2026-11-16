#!/usr/bin/env node
/**
 * Build script for GitHub Profile README
 * Assembles template with inline SVGs
 */

import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const TEMPLATE = path.join(ROOT, 'templates', 'readme.template.md');
const OUTPUT = path.join(ROOT, 'README.md');
const SVG_DIR = path.join(ROOT, 'assets', 'svgs');

const PLACEHOLDERS = [
  'SVG_HEADER',
  'SVG_STATS',
  'SVG_SOCIAL',
  'SVG_TECH_STACK',
  'SVG_ABOUT',
  'SVG_PROJECTS',
  'SVG_SNAKE',
  'SVG_FOOTER',
  'FONTS_CSS',
];

function readFile(filepath) {
  return fs.readFileSync(filepath, 'utf-8');
}

function writeFile(filepath, content) {
  fs.writeFileSync(filepath, content);
  console.log(`✓ Written: ${path.relative(ROOT, filepath)}`);
}

function loadSvg(name) {
  const filepath = path.join(SVG_DIR, `${name}.svg`);
  if (!fs.existsSync(filepath)) {
    console.warn(`⚠ SVG not found: ${filepath}`);
    return `<!-- ${name}.svg not found -->`;
  }
  return readFile(filepath);
}

function loadFontsCss() {
  const filepath = path.join(ROOT, 'assets', 'fonts.css');
  if (!fs.existsSync(filepath)) {
    return '';
  }
  return readFile(filepath);
}

function build() {
  console.log('Building README...\n');

  let template = readFile(TEMPLATE);

  // Replace placeholders
  const replacements = {
    SVG_HEADER: loadSvg('header-boot'),
    SVG_STATS: loadSvg('stats-cards'),
    SVG_SOCIAL: loadSvg('social-links'),
    SVG_TECH_STACK: loadSvg('tech-stack-files'),
    SVG_ABOUT: loadSvg('about-config'),
    SVG_PROJECTS: loadSvg('projects-index'),
    SVG_SNAKE: loadSvg('snake-game'),
    SVG_FOOTER: loadSvg('footer-shutdown'),
    FONTS_CSS: loadFontsCss(),
  };

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