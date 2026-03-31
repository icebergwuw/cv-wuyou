#!/usr/bin/env node
const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function htmlToPdf(htmlFile, pdfFile) {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--enable-gpu',
      '--use-gl=swiftshader',
      '--force-color-profile=srgb',
      '--disable-web-security',
      '--disable-cache',
      '--disk-cache-size=0',
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.goto('file://' + path.resolve(htmlFile), { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));

  // 注入覆盖样式（page.pdf()不走@media print，必须用addStyleTag）
  await page.addStyleTag({ content: `
    .fade-in { opacity: 1 !important; transform: none !important; }
    .wrapper { padding: 0 24px 32px !important; }
    body { min-height: unset !important; }
    body::before { position: absolute !important; height: 100% !important; }
  `});

  await page.pdf({
    path: path.resolve(pdfFile),
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  });

  await browser.close();
  console.log('done:', path.resolve(pdfFile));
}

const [,,a,b] = process.argv;
if (!a || !b) { console.error('用法: node scripts/html-to-pdf.js <html> <pdf>'); process.exit(1); }
htmlToPdf(a, b).catch(e => { console.error(e); process.exit(1); });
