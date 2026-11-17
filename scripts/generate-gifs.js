#!/usr/bin/env node
/**
 * Generate the animated GIFs referenced by the README.
 *
 * Renders each template SVG through the *same* data pipeline as the README
 * build (so {{name}} and friends are real values, not literal braces), then
 * seeks the SMIL timeline frame by frame in headless Chrome and encodes the
 * screenshots into a looping GIF.
 *
 * Usage:
 *   node scripts/generate-gifs.js                 all GIFs
 *   node scripts/generate-gifs.js snake-game      one GIF (by config name)
 */

import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import GIFEncoder from 'gif-encoder-2';
import { createCanvas, Image } from 'canvas';
import {
  ROOT,
  paths,
  loadYaml,
  enrichData,
  loadTemplateSvg,
  renderSvgTemplate,
  DESIGN_TOKENS,
} from './lib/render.js';

const CONFIGS = [
  {
    name: 'header-boot',
    template: 'header-boot',
    duration: 3,
    fps: 20,
    width: 720,
    height: 280,
  },
  {
    name: 'footer-shutdown',
    template: 'footer-shutdown',
    duration: 2.5,
    fps: 20,
    width: 720,
    height: 180,
  },
  {
    name: 'snake-game',
    template: 'snake-game',
    duration: 16,
    // 16s loop at 10fps: the snake only travels ~6px per frame, so this stays
    // smooth while cutting the file size roughly in half vs 15fps + NeuQuant.
    fps: 10,
    width: 720,
    height: 360,
    // The snake must actually travel: it used to be frozen in the corner
    // because animateMotion only worked through <mpath>.
    verifyMotion: { samples: 4, intervalMs: 1200 },
  },
];

function renderTemplateSvg(name, data) {
  const rendered = renderSvgTemplate(loadTemplateSvg(name), data);
  const leftover = rendered.match(/\{\{[^}]+\}\}/g);
  if (leftover) {
    throw new Error(`${name}: unresolved placeholders would be baked into the GIF: ${[
      ...new Set(leftover),
    ].join(', ')}`);
  }
  return rendered;
}

async function captureFrames(page, config) {
  const totalFrames = Math.ceil(config.duration * config.fps);
  const frameDelay = 1000 / config.fps;
  const frames = [];

  console.log(`  Capturing ${totalFrames} frames @ ${config.fps}fps...`);

  for (let i = 0; i < totalFrames; i++) {
    await page.evaluate((ts) => {
      document.querySelectorAll('svg').forEach((svg) => {
        svg.pauseAnimations();
        svg.setCurrentTime(ts / 1000);
      });
    }, i * frameDelay);

    frames.push(
      await page.screenshot({
        type: 'png',
        clip: { x: 0, y: 0, width: config.width, height: config.height },
      })
    );

    if ((i + 1) % 60 === 0 || i === totalFrames - 1) {
      process.stdout.write(`\r    frame ${i + 1}/${totalFrames}`);
    }
  }
  process.stdout.write('\n');
  return frames;
}

function encodeGif(frames, config, outputPath) {
  return new Promise((resolve, reject) => {
    // octree + palette reuse: ~40% smaller than the default NeuQuant at the
    // same visual quality (verified frame-by-frame), and much faster to encode.
    const encoder = new GIFEncoder(config.width, config.height, 'octree', true);
    const stream = fs.createWriteStream(outputPath);

    encoder.createReadStream().pipe(stream);
    encoder.start();
    encoder.setRepeat(0); // loop forever
    encoder.setDelay(Math.round(1000 / config.fps));
    encoder.setThreshold(98); // reuse the colour table when frames are ~98% identical

    stream.on('finish', () => {
      const kb = fs.statSync(outputPath).size / 1024;
      console.log(`  ✓ ${path.relative(ROOT, outputPath)} (${kb.toFixed(0)} KB)`);
      resolve(kb);
    });
    stream.on('error', reject);

    const canvas = createCanvas(config.width, config.height);
    const ctx = canvas.getContext('2d');
    let index = 0;

    const next = () => {
      if (index >= frames.length) {
        encoder.finish();
        return;
      }
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        encoder.addFrame(ctx.getImageData(0, 0, config.width, config.height).data);
        index += 1;
        next();
      };
      img.onerror = reject;
      img.src = `data:image/png;base64,${frames[index].toString('base64')}`;
    };

    next();
  });
}

/**
 * Play the finished GIF and confirm teal pixels (the snake) move between
 * samples - a regression guard for the animateMotion/<mpath> bug.
 */
async function verifyMotion(browser, gifPath, opts) {
  const page = await browser.newPage();
  await page.setViewport({ width: 740, height: 400 });
  const b64 = fs.readFileSync(gifPath).toString('base64');
  await page.setContent(
    `<!doctype html><body style="margin:0"><img id="g" src="data:image/gif;base64,${b64}">`,
    { waitUntil: 'load' }
  );
  const el = await page.$('#g');
  const samples = [];

  for (let i = 0; i < opts.samples; i++) {
    if (i > 0) await new Promise((r) => setTimeout(r, opts.intervalMs));
    const shot = await el.screenshot({ type: 'png' });
    const url = `data:image/png;base64,${shot.toString('base64')}`;
    samples.push(
      await page.evaluate(async (u) => {
        const img = new Image();
        await new Promise((res, rej) => {
          img.onload = res;
          img.onerror = rej;
          img.src = u;
        });
        const c = document.createElement('canvas');
        c.width = img.width;
        c.height = img.height;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const d = ctx.getImageData(0, 0, c.width, c.height).data;
        // snake teal (#00d9a5) inside the play field only
        let sx = 0;
        let n = 0;
        for (let y = 60; y < 330; y++) {
          for (let x = 40; x < 560; x++) {
            const i = (y * c.width + x) * 4;
            if (d[i + 1] > 170 && d[i] < 90 && d[i + 2] > 110 && d[i + 2] < 210) {
              sx += x;
              n++;
            }
          }
        }
        return { n, cx: n ? Math.round(sx / n) : null };
      }, url)
    );
  }

  await page.close();

  const positions = new Set(samples.map((s) => `${s.n}:${s.cx}`));
  console.log(
    `  motion samples: ${samples.map((s) => `x=${s.cx} (${s.n}px)`).join(', ')}`
  );
  if (samples.every((s) => s.n === 0) || positions.size < 2) {
    throw new Error(
      `Motion check FAILED for ${path.basename(gifPath)}: the snake is not moving.`
    );
  }
  console.log('  ✓ motion check passed');
}

async function generate(browser, data, config) {
  console.log(`\n📽️  ${config.name}.gif`);
  const outputPath = path.join(paths.svgDir, `${config.name}.gif`);
  const svg = renderTemplateSvg(config.template, data);

  const page = await browser.newPage();
  await page.setViewport({ width: config.width, height: config.height });
  await page.setContent(
    `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
      * { margin: 0; padding: 0; }
      body { background: ${DESIGN_TOKENS.bg}; overflow: hidden; }
      svg { display: block; }
    </style></head><body>${svg}</body></html>`,
    { waitUntil: 'load' }
  );
  await page.evaluate(() => {
    document.querySelectorAll('svg').forEach((svg) => svg.unpauseAnimations());
  });

  try {
    const frames = await captureFrames(page, config);
    await encodeGif(frames, config, outputPath);
  } finally {
    await page.close();
  }

  if (config.verifyMotion) {
    await verifyMotion(browser, outputPath, config.verifyMotion);
  }
}

async function main() {
  console.log('🎬 GIF generation\n');

  const only = process.argv.slice(2).filter((a) => !a.startsWith('-'));
  const configs = only.length
    ? CONFIGS.filter((c) => only.includes(c.name))
    : CONFIGS;
  if (!configs.length) {
    throw new Error(`No matching config. Known: ${CONFIGS.map((c) => c.name).join(', ')}`);
  }

  fs.mkdirSync(paths.svgDir, { recursive: true });
  const data = enrichData(loadYaml());

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    for (const config of configs) {
      await generate(browser, data, config);
    }
  } finally {
    await browser.close();
  }

  console.log('\n✅ GIF generation complete!');
}

main().catch((error) => {
  console.error(`\n❌ ${error.message}`);
  process.exitCode = 1;
});
