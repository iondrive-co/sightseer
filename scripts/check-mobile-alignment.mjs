// Home-page sidebar <-> arrow alignment checker.
//
// History / why this is shaped the way it is:
//   v1 measured getBoundingClientRect on a hand-rolled viewport and reported
//   perfect alignment while real phones were badly misaligned. Two distinct
//   real-device failure modes slipped through:
//     1. WRAPPING: the custom web font wasn't awaited, so a fallback font wrapped
//        descriptions differently than the device. -> fixed by device profiles +
//        document.fonts.ready below.
//     2. MOBILE URL-BAR VIEWPORT: the position:fixed sidebar (height:100%) and the
//        flow content (height:100vh) center against DIFFERENT viewport heights on a
//        real phone (the dynamic URL bar), producing a constant vertical offset.
//        Headless Chromium has NO URL bar, so 100% / 100vh / 100dvh are identical
//        there and the render test literally cannot reproduce it.
//
// Conclusion: a headless render test alone is NOT sufficient for this layout.
// So this script does BOTH:
//   (A) STATIC check of the CSS source — the only thing that can catch the
//       viewport-unit mismatch that headless can't render.
//   (B) RENDER check across real device profiles with the web font loaded —
//       catches rhythm / wrapping / start-offset regressions.
//
// Usage: node scripts/check-mobile-alignment.mjs [url]
//   url defaults to https://iondrive.co/ ; pass http://localhost:PORT for a build.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { chromium, devices } from '/home/miles/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSS_PATH = join(__dirname, '..', 'app', 'styles', 'tailwind.css');
const url = process.argv[2] || 'https://iondrive.co/';
const PROFILES = ['Pixel 7', 'Galaxy S9+', 'iPhone 13', 'iPhone SE'];

let failed = false;

// ---------------------------------------------------------------------------
// (A) Static CSS check: elements that must vertically co-center must use the
// same viewport-height unit. The sidebar is position:fixed and the home content
// lives inside .app; if one uses vh and the other %/dvh, they will misalign on a
// phone with a dynamic toolbar even though every headless render looks perfect.
// ---------------------------------------------------------------------------
function heightUnitOf(css, selector) {
  // crude but adequate: find the rule block for `selector {` and read its height.
  const re = new RegExp(`(^|[\\}\\n])\\s*${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\{([^}]*)\\}`, 'm');
  const m = css.match(re);
  if (!m) return null;
  const body = m[2];
  // explicit height: ...   OR tailwind @apply h-screen (=100vh) / h-full (=100%)
  const explicit = body.match(/height:\s*([0-9.]+)(dvh|svh|lvh|vh|%|px|rem)/);
  if (explicit) return `${explicit[1]}${explicit[2]}`;
  if (/@apply[^;]*\bh-screen\b/.test(body)) return '100vh';
  if (/@apply[^;]*\bh-full\b/.test(body)) return '100%';
  return null;
}

function staticCheck() {
  const css = readFileSync(CSS_PATH, 'utf8');
  const app = heightUnitOf(css, '.app');
  const sidebar = heightUnitOf(css, '.sidebar');
  const body = heightUnitOf(css, 'html,\\s*body') || heightUnitOf(css, 'body');
  console.log('=== (A) STATIC viewport-unit check ===');
  console.log(`  .app height    : ${app}`);
  console.log(`  .sidebar height: ${sidebar}`);
  console.log(`  html,body      : ${body}`);
  // The fixed sidebar and the flow content must use the same unit family.
  const norm = (v) => (v ? v.replace(/^100/, '') : v);
  const ok = app && sidebar && norm(app) === norm(sidebar);
  if (!ok) {
    failed = true;
    console.log(`  FAIL: .app (${app}) and .sidebar (${sidebar}) use different height references.`);
    console.log('        On a real phone the dynamic URL bar makes these differ -> constant');
    console.log('        vertical offset between sidebar links and arrows. Use the same unit');
    console.log('        (100dvh) for both. NOTE: headless cannot reproduce this; static check only.');
  } else {
    console.log(`  PASS: both co-centering containers use the same unit (${app}).`);
    if (app === '100vh') {
      console.log('  WARN: both use 100vh — consider 100dvh so content stays centered in the');
      console.log('        visible area as the mobile URL bar shows/hides.');
    }
  }
  console.log('');
}

// ---------------------------------------------------------------------------
// (B) Render check across real device profiles, with the web font loaded.
// ---------------------------------------------------------------------------
async function renderCheck() {
  const browser = await chromium.launch();
  console.log(`=== (B) RENDER check @ ${url} ===`);
  console.log('  (headless has no URL bar, so this validates rhythm/wrapping/start-offset,');
  console.log('   NOT the mobile-viewport offset — that is covered by the static check above)');
  for (const name of PROFILES) {
    const context = await browser.newContext({ ...devices[name] });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready); // wait for JetBrains Mono
    await page.waitForTimeout(250);
    const data = await page.evaluate(() => {
      const c = (el) => { const r = el.getBoundingClientRect(); return r.top + r.height / 2; };
      const links = [...document.querySelectorAll('.sidebar-link')].map(c);
      const pairs = [...document.querySelectorAll('.description-pair')].map(c);
      const jb = [...document.fonts].some((f) => f.family.includes('JetBrains') && f.status === 'loaded');
      return { links, pairs, jb, w: window.innerWidth };
    });
    const n = Math.min(data.links.length, data.pairs.length);
    let maxAbs = 0;
    for (let i = 0; i < n; i++) maxAbs = Math.max(maxAbs, Math.abs(data.links[i] - data.pairs[i]));
    const pass = maxAbs <= 1.5;
    if (!pass) failed = true;
    console.log(`  ${name.padEnd(11)} ${String(data.w).padStart(3)}px  font:${data.jb ? 'JBMono' : 'FALLBACK!'}  max|Δ|=${maxAbs.toFixed(1)}px  ${pass ? 'PASS' : 'FAIL'}`);
    if (!data.jb) { failed = true; console.log('    FAIL: JetBrains Mono not loaded — measurements use the wrong font widths.'); }
    await context.close();
  }
  await browser.close();
  console.log('');
}

staticCheck();
await renderCheck();
console.log(`OVERALL: ${failed ? 'FAIL' : 'PASS'}`);
process.exit(failed ? 1 : 0);
