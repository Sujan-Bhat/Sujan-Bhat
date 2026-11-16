#!/usr/bin/env node

/**
 * Generate GIFs from animated SVG templates
 * Uses Puppeteer to render SVG animations and capture frames
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import GIFEncoder from 'gif-encoder-2';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const TEMPLATES_DIR = path.join(PROJECT_ROOT, 'templates', 'svgs');
const ASSETS_DIR = path.join(PROJECT_ROOT, 'assets', 'svgs');

// Design tokens from the project
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
  fontMono: "'JetBrains Mono', monospace",
  fontUI: "'Space Grotesk', sans-serif",
};

// SVG files to convert (with their animation durations in seconds)
const SVG_CONFIGS = [
  {
    name: 'snake-game',
    template: 'snake-game.svg',
    duration: 16, // Full snake path cycle
    fps: 30,
    width: 720,
    height: 360,
  },
  {
    name: 'header-boot',
    template: 'header-boot.svg',
    duration: 3, // Boot sequence completes around 2.6s + blinking
    fps: 30,
    width: 720,
    height: 280,
  },
  {
    name: 'footer-shutdown',
    template: 'footer-shutdown.svg',
    duration: 2.5, // Shutdown sequence completes around 2s + blinking
    fps: 30,
    width: 720,
    height: 140,
  },
];

function replaceTokens(svgContent) {
  let result = svgContent;
  for (const [token, value] of Object.entries(DESIGN_TOKENS)) {
    const placeholder = `{{${token}}}`;
    result = result.replaceAll(placeholder, value);
  }
  return result;
}

async function captureFrames(page, config) {
  const totalFrames = Math.ceil(config.duration * config.fps);
  const frameDelay = 1000 / config.fps;
  const frames = [];

  console.log(`  Capturing ${totalFrames} frames at ${config.fps} FPS for ${config.duration}s...`);

  for (let i = 0; i < totalFrames; i++) {
    const timestamp = i * frameDelay;

    // For SVG SMIL animations, we need to seek to the specific time
    await page.evaluate((ts) => {
      // Pause all SMIL animations and set current time
      const svgs = document.querySelectorAll('svg');
      svgs.forEach(svg => {
        // Pause animations
        svg.pauseAnimations();
        // Set the current time
        svg.setCurrentTime(ts / 1000);
      });
    }, timestamp);

    // Small delay to ensure rendering
    await new Promise(resolve => setTimeout(resolve, 10));

    // Capture frame
    const frame = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: 0, width: config.width, height: config.height },
    });

    frames.push(frame);

    // Progress indicator
    if ((i + 1) % 30 === 0 || i === totalFrames - 1) {
      console.log(`    Frame ${i + 1}/${totalFrames}`);
    }
  }

  return frames;
}

async function framesToGif(frames, config, outputPath) {
  return new Promise((resolve, reject) => {
    const encoder = new GIFEncoder(config.width, config.height);
    const stream = fs.createWriteStream(outputPath);

    encoder.createReadStream().pipe(stream);
    encoder.start();
    encoder.setRepeat(0); // 0 = loop forever
    encoder.setDelay(1000 / config.fps);
    encoder.setQuality(10); // Lower = better quality

    let frameIndex = 0;

    function addNextFrame() {
      if (frameIndex >= frames.length) {
        encoder.finish();
        return;
      }

      // Convert PNG buffer to image data
      const pngBuffer = frames[frameIndex];

      // Use a simple approach: create an ImageData from the PNG
      // We'll use a canvas to decode the PNG
      const canvas = document.createElement('canvas');
      canvas.width = config.width;
      canvas.height = config.height;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, config.width, config.height);
        encoder.addFrame(imageData.data);
        frameIndex++;
        addNextFrame();
      };
      img.onerror = reject;
      img.src = `data:image/png;base64,${pngBuffer.toString('base64')}`;
    }

    // Since we're in Node, we need a different approach
    // Let's use the encoder's addFrame with raw pixel data
    // We'll need to decode PNGs - use a different approach

    stream.on('finish', () => {
      console.log(`  GIF saved: ${outputPath} (${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB)`);
      resolve();
    });

    stream.on('error', reject);

    // Use a workaround: write frames using the encoder directly
    // gif-encoder-2 expects addFrame(ctx) where ctx is a CanvasRenderingContext2D
    // In Node, we need a different library or approach
  });
}

// Alternative: Use puppeteer's built-in capabilities to generate GIF directly
async function generateGifWithPuppeteer(config, processedSvg, outputPath) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: config.width, height: config.height });

    // Create HTML page with the SVG
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; }
    body { background: ${DESIGN_TOKENS.bg}; overflow: hidden; }
    svg { display: block; }
  </style>
</head>
<body>
  ${processedSvg}
  <script>
    // Auto-start SMIL animations
    document.querySelectorAll('svg').forEach(svg => {
      svg.unpauseAnimations();
    });
  </script>
</body>
</html>`;

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Wait a moment for animations to start
    await new Promise(resolve => setTimeout(resolve, 500));

    // Use puppeteer to record frames
    const totalFrames = Math.ceil(config.duration * config.fps);
    const frameDelay = 1000 / config.fps;
    const frames = [];

    for (let i = 0; i < totalFrames; i++) {
      const timestamp = i * frameDelay;

      await page.evaluate((ts) => {
        const svgs = document.querySelectorAll('svg');
        svgs.forEach(svg => {
          svg.pauseAnimations();
          svg.setCurrentTime(ts / 1000);
        });
      }, timestamp);

      await new Promise(resolve => setTimeout(resolve, 5));

      const frame = await page.screenshot({
        type: 'png',
        clip: { x: 0, y: 0, width: config.width, height: config.height },
      });

      frames.push(frame);

      if ((i + 1) % 30 === 0 || i === totalFrames - 1) {
        console.log(`    Frame ${i + 1}/${totalFrames}`);
      }
    }

    // Now create GIF from frames using a Node-based approach
    await createGifFromFrames(frames, config, outputPath);

  } finally {
    await browser.close();
  }
}

async function createGifFromFrames(frames, config, outputPath) {
  // Use gif-encoder-2 with a canvas-like approach
  // We'll use the 'canvas' package to decode PNGs
  const { createCanvas, Image } = await import('canvas');
  const encoder = new GIFEncoder(config.width, config.height);
  const stream = fs.createWriteStream(outputPath);

  return new Promise((resolve, reject) => {
    const canvas = createCanvas(config.width, config.height);
    const ctx = canvas.getContext('2d');

    encoder.createReadStream().pipe(stream);
    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(1000 / config.fps);
    encoder.setQuality(10);

    let frameIndex = 0;

    function processFrame() {
      if (frameIndex >= frames.length) {
        encoder.finish();
        return;
      }

      const pngBuffer = frames[frameIndex];
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, config.width, config.height);
        encoder.addFrame(imageData.data);
        frameIndex++;
        processFrame();
      };
      img.onerror = reject;
      img.src = `data:image/png;base64,${pngBuffer.toString('base64')}`;
    }

    stream.on('finish', () => {
      const stats = fs.statSync(outputPath);
      console.log(`  ✓ GIF saved: ${outputPath} (${(stats.size / 1024).toFixed(1)} KB)`);
      resolve();
    });

    stream.on('error', reject);

    processFrame();
  });
}

async function processSvg(config) {
  console.log(`\n📽️  Processing ${config.name}.svg...`);

  const templatePath = path.join(TEMPLATES_DIR, config.template);
  const outputPath = path.join(ASSETS_DIR, `${config.name}.gif`);

  if (!fs.existsSync(templatePath)) {
    console.log(`  ⚠️  Template not found: ${templatePath}`);
    return;
  }

  // Read and process template
  const templateContent = fs.readFileSync(templatePath, 'utf-8');
  const processedSvg = replaceTokens(templateContent);

  // Generate GIF
  await generateGifWithPuppeteer(config, processedSvg, outputPath);
}

async function main() {
  console.log('🎬 GIF Generation Script');
  console.log('========================');

  // Ensure output directory exists
  if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
  }

  // Check if canvas is available (needed for gif-encoder-2)
  try {
    await import('canvas');
  } catch {
    console.log('\n📦 Installing canvas dependency...');
    const { execSync } = await import('child_process');
    execSync('npm install canvas --save-dev', { cwd: PROJECT_ROOT, stdio: 'inherit' });
  }

  for (const config of SVG_CONFIGS) {
    try {
      await processSvg(config);
    } catch (error) {
      console.error(`  ✗ Error processing ${config.name}:`, error.message);
    }
  }

  console.log('\n✅ GIF generation complete!');
  console.log(`📁 Output directory: ${ASSETS_DIR}`);

  // List generated files
  const files = fs.readdirSync(ASSETS_DIR).filter(f => f.endsWith('.gif'));
  if (files.length > 0) {
    console.log('\nGenerated GIFs:');
    for (const file of files) {
      const stats = fs.statSync(path.join(ASSETS_DIR, file));
      console.log(`  - ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
    }
  }
}

main().catch(console.error);