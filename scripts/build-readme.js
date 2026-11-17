#!/usr/bin/env node
/**
 * Build script for the GitHub Profile README.
 *
 * Renders every template SVG with the YAML data, writes them to
 * assets/svgs/, then assembles templates/readme.template.md.
 *
 * Usage:
 *   node scripts/build-readme.js           one-shot build
 *   node scripts/build-readme.js --watch   rebuild on template/data changes
 */

import fs from 'fs';
import path from 'path';
import {
  ROOT,
  paths,
  loadYaml,
  enrichData,
  readFile,
  writeFile,
  renderTemplate,
  buildSvg,
} from './lib/render.js';

/** Sections rendered as GIF (they carry multi-step animations). */
const GIF_FOR = {
  header: 'header-boot.gif',
  snake: 'snake-game.gif',
  footer: 'footer-shutdown.gif',
};

/** Template key -> template SVG file name (without .svg). */
const TEMPLATE_SVGS = {
  header: 'header-boot',
  social: 'social-links',
  techStack: 'tech-stack-files',
  about: 'about-config',
  snake: 'snake-game',
  footer: 'footer-shutdown',
};

function placeholderFor(key) {
  return key === 'techStack' ? 'SVG_TECH_STACK' : `SVG_${key.toUpperCase()}`;
}

function build() {
  console.log('Building README...\n');

  const data = enrichData(loadYaml());
  let template = readFile(paths.template);

  for (const [key, templateName] of Object.entries(TEMPLATE_SVGS)) {
    const minified = buildSvg(templateName, data);
    const svgPath = path.join(paths.svgDir, `${key}.svg`);
    writeFile(svgPath, minified);

    const gif = GIF_FOR[key];
    const gifPath = gif && fs.existsSync(path.join(paths.svgDir, gif));
    const reference = gifPath
      ? `![${key}](assets/svgs/${gif})`
      : `![${key}](assets/svgs/${key}.svg)`;
    if (gif && !gifPath) {
      console.warn(`  ⚠ ${gif} not found - falling back to ${key}.svg (run: npm run gifs)`);
    }

    const placeholder = `{{${placeholderFor(key)}}}`;
    if (!template.includes(placeholder)) {
      console.warn(`  ⚠ Placeholder ${placeholder} not found in template`);
    }
    template = template.replaceAll(placeholder, reference);
  }

  // Data placeholders ({{_socialMd}}, {{lastUpdated}}, ...) resolve last.
  template = renderTemplate(template, data);

  const leftover = template.match(/\{\{[^}]+\}\}/g);
  if (leftover) {
    throw new Error(`Unresolved placeholders in README: ${[...new Set(leftover)].join(', ')}`);
  }

  writeFile(paths.output, template);
  console.log('\n✅ Build complete!');
}

function watch() {
  console.log('Watching templates, data and scripts for changes...\n');
  const targets = [
    path.join(ROOT, 'templates'),
    path.join(ROOT, 'data'),
    path.join(ROOT, 'scripts'),
  ];
  let timer = null;
  const run = () => {
    try {
      build();
    } catch (error) {
      console.error(`\n❌ Build failed: ${error.message}`);
    }
  };

  for (const dir of targets) {
    fs.watch(dir, { recursive: true }, (_event, filename) => {
      if (filename && filename.includes('readme.md.bak')) return;
      clearTimeout(timer);
      timer = setTimeout(run, 150);
    });
  }
}

if (process.argv.includes('--watch')) {
  watch();
} else {
  build();
}
