/**
 * Quick headless check: open web app and report computed styles.
 * Requires: npx playwright chromium installed
 */
import { chromium } from 'playwright';

const url = process.env.URL || 'http://localhost:8081';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
page.on('pageerror', (e) => console.log('PAGEERROR', e.message));
page.on('console', (m) => {
  if (m.type() === 'error') console.log('CONSOLE', m.text());
});

await page.goto(url, { waitUntil: 'networkidle', timeout: 120000 });
await page.waitForTimeout(2000);

const info = await page.evaluate(() => {
  const body = getComputedStyle(document.body);
  const btn = document.querySelector('button, [role="button"]');
  const btnStyle = btn ? getComputedStyle(btn) : null;
  const stylesheets = [...document.styleSheets].length;
  const styleTags = document.querySelectorAll('style').length;
  return {
    bodyBg: body.backgroundColor,
    bodyFont: body.fontFamily,
    btnBg: btnStyle?.backgroundColor ?? null,
    btnColor: btnStyle?.color ?? null,
    styleTags,
    stylesheets,
    textSample: document.body.innerText.slice(0, 120),
    hasSvg: !!document.querySelector('svg'),
  };
});

console.log(JSON.stringify(info, null, 2));
await page.screenshot({ path: 'scripts/ui-check.png', fullPage: true });
await browser.close();
