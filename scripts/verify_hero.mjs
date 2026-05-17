// Playwright smoke-check: load hero, capture frames at 3 scroll positions.
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'screenshots');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const URL = process.env.URL || 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });

  // Wait for first frame to actually render (canvas pixels non-empty)
  await page.waitForFunction(() => {
    const c = document.querySelector('canvas');
    if (!c) return false;
    const ctx = c.getContext('2d');
    if (!ctx || c.width === 0) return false;
    try {
      const d = ctx.getImageData(c.width / 2, c.height / 2, 1, 1).data;
      return d[3] > 0;
    } catch {
      return true;
    }
  }, null, { timeout: 15000 }).catch(() => console.warn('canvas wait timed out'));

  const stops = [0, 0.5, 1.0];
  for (const s of stops) {
    await page.evaluate((p) => {
      const sec = document.querySelector('section');
      if (!sec) return;
      const total = sec.getBoundingClientRect().height - window.innerHeight;
      window.scrollTo({ top: total * p, behavior: 'instant' });
    }, s);
    await page.waitForTimeout(500);
    const label = `hero_${String(Math.round(s * 100)).padStart(3, '0')}`;
    await page.screenshot({ path: path.join(OUT, `${label}.png`), fullPage: false });
    console.log('captured', label);
  }

  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
