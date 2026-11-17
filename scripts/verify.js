#!/usr/bin/env node
/**
 * Static + visual verification for the generated README assets.
 *
 * Catches the classes of bug that shipped before:
 *   - unresolved {{placeholders}} / NaN in output
 *   - SMIL transform animations (broken in Chrome, doubled elsewhere)
 *   - SVGs without width/height (they resize differently from the GIFs)
 *   - elements drawn outside the SVG canvas (clipped rows, invisible text)
 *   - README referencing files that don't exist
 *
 * Usage: node scripts/verify.js
 */

import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { ROOT, paths, readFile } from './lib/render.js';

const problems = [];
const fail = (msg) => problems.push(msg);

function checkSvgMarkup(file) {
  const rel = path.relative(ROOT, file);
  const svg = readFile(file);

  const braces = svg.match(/\{\{[^}]+\}\}/g);
  if (braces) fail(`${rel}: unresolved placeholders ${[...new Set(braces)].join(', ')}`);

  if (/\bNaN\b|undefined/.test(svg)) fail(`${rel}: contains NaN/undefined`);

  if (svg.includes('additive="sum"')) fail(`${rel}: additive="sum" transform animation`);
  if (/attributeName="transform"/.test(svg)) {
    fail(`${rel}: SMIL transform animation (does not run in Chrome)`);
  }

  const root = /<svg[^>]*>/.exec(svg)?.[0] ?? '';
  if (!/viewBox="/.test(root)) fail(`${rel}: <svg> has no viewBox`);
  if (!/\swidth="/.test(root) || !/\sheight="/.test(root)) {
    fail(`${rel}: <svg> is missing width/height (sections would render at different widths)`);
  }
}

function checkReadme() {
  const rel = 'README.md';
  const readme = readFile(paths.output);

  const braces = readme.match(/\{\{[^}]+\}\}/g);
  if (braces) fail(`${rel}: unresolved placeholders ${[...new Set(braces)].join(', ')}`);

  const refs = [...readme.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map((m) => m[1]);
  if (!refs.length) fail(`${rel}: no images referenced`);

  for (const ref of refs) {
    if (/^https?:/.test(ref)) continue;
    const target = path.join(ROOT, ref);
    if (!fs.existsSync(target)) {
      fail(`${rel}: missing asset ${ref}`);
      continue;
    }
    const stat = fs.statSync(target);
    if (ref.endsWith('.gif')) {
      const head = fs.readFileSync(target).subarray(0, 6).toString('latin1');
      if (stat.size < 20 * 1024 || !head.startsWith('GIF8')) {
        fail(`${rel}: ${ref} is not a valid GIF (${stat.size} bytes)`);
      }
    } else if (ref.endsWith('.svg')) {
      const head = readFile(target).slice(0, 200);
      if (stat.size < 500 || !head.includes('<svg')) {
        fail(`${rel}: ${ref} is not a valid SVG (${stat.size} bytes)`);
      }
    }
  }
}

/** Render each SVG and flag geometry that falls outside its own canvas. */
async function checkBounds(files) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    for (const file of files) {
      const rel = path.relative(ROOT, file);
      const svg = readFile(file);
      const m = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg);
      if (!m) continue;
      const w = Math.ceil(Number(m[1]));
      const h = Math.ceil(Number(m[2]));

      await page.setViewport({ width: w, height: h });
      await page.setContent(
        `<!doctype html><body style="margin:0;background:#0d1117">${svg}</body>`,
        { waitUntil: 'load' }
      );
      await page.evaluate(() => {
        document.querySelectorAll('svg').forEach((s) => {
          s.pauseAnimations();
          s.setCurrentTime(5); // end state: everything should be visible
        });
      });

      const issues = await page.evaluate(() => {
        const root = document.querySelector('svg');
        const rr = root.getBoundingClientRect();
        const tol = 3;
        const out = [];
        const filtered = (el) => {
          for (let p = el; p && p.tagName !== 'body'; p = p.parentElement) {
            if (p.getAttribute?.('filter')) return true;
          }
          return false;
        };
        root
          .querySelectorAll('text, rect, circle, path, line, polygon, ellipse, tspan')
          .forEach((el) => {
            if (filtered(el)) return;
            const r = el.getBoundingClientRect();
            if (!r.width && !r.height) return;
            const over = {
              left: rr.left - r.left,
              top: rr.top - r.top,
              right: r.right - rr.right,
              bottom: r.bottom - rr.bottom,
            };
            const bad = Object.entries(over)
              .filter(([, v]) => v > tol)
              .map(([k, v]) => `${k} ${Math.round(v)}px`);
            if (bad.length) {
              out.push(
                `${el.tagName}${el.getAttribute('x') ? `[x=${el.getAttribute('x')}]` : ''} ` +
                  `"${(el.textContent || '').trim().slice(0, 32)}" -> ${bad.join(', ')}`
              );
            }
          });
        return out;
      });

      for (const issue of issues) fail(`${rel}: outside canvas - ${issue}`);
    }
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('🔎 Verifying README assets...\n');

  const svgs = fs
    .readdirSync(paths.svgDir)
    .filter((f) => f.endsWith('.svg'))
    .map((f) => path.join(paths.svgDir, f))
    .sort();

  svgs.forEach(checkSvgMarkup);
  checkReadme();

  console.log(`  markup:  ${svgs.length} SVGs checked`);
  console.log('  readme:  placeholders + asset references checked');
  await checkBounds(svgs);
  console.log(`  bounds:  ${svgs.length} rendered SVGs checked`);

  if (problems.length) {
    console.error(`\n❌ ${problems.length} problem(s):`);
    for (const p of problems) console.error(`   - ${p}`);
    process.exitCode = 1;
    return;
  }

  console.log('\n✅ All checks passed');
}

main().catch((error) => {
  console.error(`\n❌ Verify crashed: ${error.message}`);
  process.exitCode = 1;
});
