/**
 * Shared rendering library for the README build and the GIF generator.
 *
 * Single source of truth for: design tokens, template rendering, data
 * enrichment (all layout math lives here so SVG templates stay declarative).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { optimize } from 'svgo';
import { load } from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const ROOT = path.resolve(__dirname, '..', '..');

export const paths = {
  template: path.join(ROOT, 'templates', 'readme.template.md'),
  output: path.join(ROOT, 'README.md'),
  svgDir: path.join(ROOT, 'assets', 'svgs'),
  dataFile: path.join(ROOT, 'data', 'profile.yaml'),
  templateSvgDir: path.join(ROOT, 'templates', 'svgs'),
};

export const DESIGN_TOKENS = {
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
  // System stacks: GitHub's <img> SVGs and headless Chrome both refuse to
  // load remote @font-face, so a webfont name would silently fall back anyway.
  fontMono: "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace",
  fontUI: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
};

/* ------------------------------------------------------------------ io --- */

export function readFile(filepath) {
  return fs.readFileSync(filepath, 'utf-8');
}

export function writeFile(filepath, content) {
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content);
  console.log(`✓ Written: ${path.relative(ROOT, filepath)}`);
}

export function loadYaml(filepath = paths.dataFile) {
  return load(readFile(filepath));
}

export function loadTemplateSvg(name) {
  const filepath = path.join(paths.templateSvgDir, `${name}.svg`);
  if (!fs.existsSync(filepath)) {
    throw new Error(`Template SVG not found: ${filepath}`);
  }
  return readFile(filepath);
}

/* -------------------------------------------------------------- render --- */

export function resolveValue(key, data) {
  const trimmed = String(key).trim();
  // Literals resolve directly: `{{add index 50}}` used to yield NaN because a
  // numeric literal was looked up as a data key.
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  let value = data;
  for (const k of trimmed.split('.')) {
    value = value?.[k];
    if (value === undefined) return '';
  }
  return value;
}

export function renderTemplate(template, data) {
  return template.replace(/\{\{([^}]+)\}\}/g, (match, expr) => {
    const trimmed = expr.trim();

    if (trimmed.startsWith('add ')) {
      const [a, b] = trimmed.slice(4).split(' ');
      return String(Number(resolveValue(a, data)) + Number(resolveValue(b, data)));
    }
    if (trimmed.startsWith('mul ')) {
      const [a, b] = trimmed.slice(4).split(' ');
      return String(Number(resolveValue(a, data)) * Number(resolveValue(b, data)));
    }
    if (trimmed.startsWith('eq ')) {
      const [a, b] = trimmed.slice(3).split(' ');
      return String(resolveValue(a, data) === resolveValue(b, data));
    }
    if (trimmed.startsWith('length ')) {
      const arr = resolveValue(trimmed.slice(7), data);
      return String(Array.isArray(arr) ? arr.length : 0);
    }

    return String(resolveValue(trimmed, data));
  });
}

export function renderSvgTemplate(template, data, tokens = DESIGN_TOKENS) {
  // Expand {{#each}} blocks first so item-scoped placeholders resolve against
  // the item, then process every remaining placeholder against the root data.
  const expanded = template.replace(
    /\{\{#each (\w+(?:\.\w+)*)\}\}([\s\S]*?)\{\{\/each\}\}/g,
    (match, arrayPath, itemTemplate) => {
      const arr = resolveValue(arrayPath, data);
      if (!Array.isArray(arr)) return '';
      return arr
        .map((item, i) =>
          renderTemplate(itemTemplate, { ...item, ...tokens, index: i })
        )
        .join('');
    }
  );

  return renderTemplate(expanded, { ...data, ...tokens });
}

export function minifySvg(svgContent) {
  const result = optimize(svgContent, {
    multipass: true,
    plugins: [
      'removeDoctype',
      'removeXMLProcInst',
      'removeComments',
      'removeMetadata',
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
      // NOTE: no `removeDimensions` (SVGs must keep width/height so they match
      // the GIF sections at 720px) and no `removeTitle` (accessibility).
      'removeScriptElement',
      'removeStyleElement',
      'prefixIds',
    ],
    js2svg: { pretty: false, indent: 0 },
  });

  if (result.error) throw result.error;
  return result.data;
}

/* ------------------------------------------------------------ helpers ---- */

/** Pick black/white text for a background colour (WCAG-ish luminance). */
export function textOn(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex ?? '').trim());
  if (!m) return '#fff';
  const n = parseInt(m[1], 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const luma = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luma > 0.6 ? '#000' : '#fff';
}

function formatSize(bytes) {
  return bytes >= 1024 ? `${(bytes / 1024).toFixed(1)}K` : `${bytes}B`;
}

function badgeStyle(icon, color, fontSize) {
  const label = String(icon ?? '');
  const width = Math.max(16, Math.ceil(label.length * fontSize * 0.62) + 6);
  return {
    _badgeFs: fontSize,
    _badgeW: width,
    _badgeHalf: width / 2,
    _fileX: width + 6,
    _textColor: textOn(color),
  };
}

/* ----------------------------------------------------------- enrichment -- */

const ROW_H = 24;

function techRows(items, cursor, delayBase) {
  return (items ?? []).map((item, i) => ({
    ...item,
    _yPos: cursor + i * ROW_H,
    _animDelay: (delayBase + i * 0.05).toFixed(2),
    _size: formatSize(String(item.name ?? item.file ?? '').length * 120),
    ...badgeStyle(item.icon, item.color, String(item.icon ?? '').length <= 2 ? 9 : 8),
    _textColor: textOn(item.color),
  }));
}

const lastY = (rows, fallback) =>
  rows.length ? rows[rows.length - 1]._yPos : fallback;

/**
 * Compute every derived value the SVG templates need. All geometry (row
 * positions, panel heights, canvas heights, line numbers) is derived here so
 * templates never hardcode coordinates that can drift out of the canvas.
 */
export function enrichData(rawData) {
  const data = { ...rawData };
  const ts = { ...(data.tech_stack ?? {}) };
  data.tech_stack = ts;

  /* -- tech stack: sequential layout of files + directory headers -------- */
  const SECTION_HEADER_GAP = 40; // last file row -> directory header
  const HEADER_TO_ROW = 26; // directory header -> first file row

  let cursor = 96; // first baseline (below column headers + divider)
  ts.languages = techRows(ts.languages, cursor, 0.15);
  cursor = lastY(ts.languages, cursor - ROW_H) + SECTION_HEADER_GAP;

  data._frontendHeaderY = cursor;
  data._frontendHeaderDelay = '0.45';
  cursor += HEADER_TO_ROW;
  ts.frontend = techRows(ts.frontend, cursor, 0.5);
  cursor = lastY(ts.frontend, cursor - ROW_H) + SECTION_HEADER_GAP;

  data._backendHeaderY = cursor;
  data._backendHeaderDelay = '0.65';
  cursor += HEADER_TO_ROW;
  ts.backend = techRows(ts.backend, cursor, 0.7);
  cursor = lastY(ts.backend, cursor - ROW_H) + SECTION_HEADER_GAP;

  data._toolsHeaderY = cursor;
  data._toolsHeaderDelay = '0.85';
  cursor += HEADER_TO_ROW;
  ts.tools = techRows(ts.tools, cursor, 0.9);

  const contentBottom = lastY(ts.tools, cursor - HEADER_TO_ROW) + 18;
  data._techPanelBottom = contentBottom + 14;
  data._techPanelH = data._techPanelBottom - 10;
  data._techViewBoxH = data._techPanelBottom + 10;

  /* -- social links: rows, dividers, panel/canvas height ---------------- */
  const focusLines = data.current_focus ?? [];
  const socialLinks = data.social_links ?? [];
  const ROW_TOP = 54;
  const ROW_PITCH = 34;
  const ROW_VISUAL_H = 32;

  data._socialRows = socialLinks.map((item, i) => ({
    ...item,
    _rowY: ROW_TOP + i * ROW_PITCH,
    _iconText: textOn(item.icon_color),
  }));
  data._socialDividers = socialLinks
    .slice(0, -1)
    .map((_, i) => ({ y: ROW_TOP + (i + 1) * ROW_PITCH - 1 }));

  const rowsBottom = socialLinks.length
    ? ROW_TOP + (socialLinks.length - 1) * ROW_PITCH + ROW_VISUAL_H
    : ROW_TOP;
  data._socialPanelH = rowsBottom + 2 - 10;
  data._socialViewBoxH = data._socialPanelH + 20;
  // Real HTML links: <a> inside an <img>-embedded SVG never works, so the
  // README needs an actual clickable row under the picture.
  data._socialMd = socialLinks
    .map((l) => `<a href="${l.url}">${l.label}</a>`)
    .join(' &middot; ');

  /* -- about/config.yaml: line numbers + rows --------------------------- */
  const focusLen = focusLines.length;
  const socialLen = socialLinks.length;

  data._focusLines = focusLines.map((text, i) => ({
    text,
    lineNum: 5 + i,
    animDelay: (0.3 + i * 0.05).toFixed(2),
    yPos: 96 + i * ROW_H,
  }));

  data._interestLines = socialLinks.map((item, i) => ({
    label: item.label,
    lineNum: 8 + i, // continues after the left column (1..7)
    animDelay: (0.7 + i * 0.05).toFixed(2),
    yPos: 60 + i * ROW_H,
  }));

  data._interestsLabelLine = focusLen + 5;
  data._interestsLabelDelay = (0.45 + focusLen * 0.05).toFixed(2);
  data._interestsLabelY = 96 + focusLen * ROW_H;
  data._vimLine = 8 + socialLen;
  data._vimY = 120 + focusLen * ROW_H;
  data._cursorLine = 9 + socialLen;
  data._cursorY = 144 + focusLen * ROW_H;

  /* -- misc ------------------------------------------------------------- */
  data.lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return data;
}

/** Render one template SVG to final, minified SVG markup. Throws on leftovers. */
export function buildSvg(name, data = enrichData(loadYaml())) {
  const rendered = renderSvgTemplate(loadTemplateSvg(name), data);
  const leftover = rendered.match(/\{\{[^}]+\}\}/g);
  if (leftover) {
    throw new Error(`${name}: unresolved placeholders: ${[...new Set(leftover)].join(', ')}`);
  }
  if (/NaN|undefined/.test(rendered)) {
    throw new Error(`${name}: rendered SVG contains NaN/undefined`);
  }
  return minifySvg(rendered);
}
