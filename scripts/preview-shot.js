#!/usr/bin/env node
const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function shot(htmlFile, outFile) {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--force-color-profile=srgb', '--disable-web-security'],
  });
  const page = await browser.newPage();

  // 初始视口
  await page.setViewport({ width: 794, height: 1200, deviceScaleFactor: 3 });
  await page.goto('file://' + path.resolve(htmlFile), { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));

  // 移除min-height限制，让body收缩到真实内容高度
  const bodyHeight = await page.evaluate(() => {
    document.body.style.minHeight = 'unset';
    document.documentElement.style.minHeight = 'unset';
    // 找所有wrapper/container也清掉
    document.querySelectorAll('*').forEach(el => {
      const s = window.getComputedStyle(el);
      if (s.minHeight === '100vh' || s.minHeight === '100%') {
        el.style.minHeight = 'unset';
      }
    });
    // 强制reflow
    document.body.getBoundingClientRect();
    return document.body.scrollHeight;
  });

  console.log('real body height:', bodyHeight);

  // 用真实高度截图
  await page.setViewport({ width: 794, height: bodyHeight, deviceScaleFactor: 3 });
  await new Promise(r => setTimeout(r, 500));

  await page.screenshot({ path: outFile, fullPage: false, type: 'jpeg', quality: 95 });
  await browser.close();
  console.log('done:', outFile);
}

const [,,a,b] = process.argv;
shot(a, b).catch(e => { console.error(e); process.exit(1); });
