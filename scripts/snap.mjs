import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

await mkdir('screenshots', { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

page.on('console', (msg) => console.log(`[console.${msg.type()}]`, msg.text()));
page.on('pageerror', (err) => console.log('[pageerror]', err.message));

await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
await page.screenshot({ path: 'screenshots/hero-top.png', fullPage: false });

await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 0.75, behavior: 'instant' }));
await page.waitForTimeout(1500);
await page.screenshot({ path: 'screenshots/hero-mid.png', fullPage: false });

await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.5, behavior: 'instant' }));
await page.waitForTimeout(1500);
await page.screenshot({ path: 'screenshots/hero-end.png', fullPage: false });

await browser.close();
console.log('done');
