import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const VIEWPORTS = [
  { name: '4k',      width: 2560, height: 1440 },
  { name: 'desktop', width: 1440, height: 900  },
  { name: 'laptop',  width: 1280, height: 800  },
  { name: 'tablet',  width: 1024, height: 768  },
  { name: 'mobile-l', width: 414, height: 896  },
  { name: 'mobile',  width: 375,  height: 667  },
];

const SCROLLS = [
  { name: 'top', y: 0 },
  { name: 'p25', y: 0.5 },
  { name: 'p50', y: 1.0 },
  { name: 'p75', y: 1.5 },
  { name: 'end', y: 2.0 },
];

await mkdir('screenshots', { recursive: true });

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  page.on('pageerror', (err) => console.log(`[${vp.name}] pageerror:`, err.message));

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  for (const s of SCROLLS) {
    await page.evaluate((mult) => window.scrollTo({ top: window.innerHeight * mult, behavior: 'instant' }), s.y);
    await page.waitForTimeout(900);
    await page.screenshot({ path: `screenshots/${vp.name}-${s.name}.png`, fullPage: false });
  }

  await ctx.close();
  console.log(`done: ${vp.name}`);
}

await browser.close();
console.log('all done');
