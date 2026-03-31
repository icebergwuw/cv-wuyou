#!/usr/bin/env node
/**
 * 截图转PDF：保留所有CSS视觉效果（backdrop-filter等）
 * 用法: node scripts/screenshot-to-pdf.js <html> <pdf>
 */
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const A4_WIDTH_PX = 794;
const DPR = 3;

async function run(htmlFile, pdfFile) {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--force-color-profile=srgb', '--disable-web-security'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: A4_WIDTH_PX, height: 1200, deviceScaleFactor: DPR });
  await page.goto('file://' + path.resolve(htmlFile), { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));

  // 去掉min-height，获取真实高度
  const bodyHeight = await page.evaluate(() => {
    document.querySelectorAll('*').forEach(el => {
      const s = window.getComputedStyle(el);
      if (s.minHeight === '100vh') el.style.minHeight = 'unset';
    });
    document.body.getBoundingClientRect();
    return document.body.scrollHeight;
  });

  await page.setViewport({ width: A4_WIDTH_PX, height: bodyHeight, deviceScaleFactor: DPR });
  await new Promise(r => setTimeout(r, 500));

  // 截JPEG
  const imgBuf = await page.screenshot({ fullPage: false, type: 'jpeg', quality: 97 });
  await browser.close();

  // 图片实际像素
  const imgW = A4_WIDTH_PX * DPR;
  const imgH = bodyHeight * DPR;

  // A4 points (595.28 x 841.89)，按A4宽适配，高度自适应
  const A4_W_PT = 595.28;
  const pageHeightPt = (imgH / imgW) * A4_W_PT;

  // 组装PDF
  const pdf = buildPdf(imgBuf, imgW, imgH, A4_W_PT, pageHeightPt);
  fs.writeFileSync(path.resolve(pdfFile), pdf);

  console.log(`✓ ${path.resolve(pdfFile)}`);
  console.log(`  图片: ${imgW}×${imgH}px  PDF页面: ${A4_W_PT.toFixed(0)}×${pageHeightPt.toFixed(0)}pt`);
}

function buildPdf(jpegBuf, imgW, imgH, pageW, pageH) {
  // 手写最小PDF，嵌入JPEG
  const parts = [];
  const offsets = [];

  const header = '%PDF-1.4\n%\xFF\xFF\xFF\xFF\n';
  parts.push(Buffer.from(header));

  function obj(n, dict, stream) {
    offsets[n] = parts.reduce((a, b) => a + b.length, 0);
    if (stream !== undefined) {
      parts.push(Buffer.from(`${n} 0 obj\n${dict}\nstream\n`));
      parts.push(stream);
      parts.push(Buffer.from('\nendstream\nendobj\n'));
    } else {
      parts.push(Buffer.from(`${n} 0 obj\n${dict}\nendobj\n`));
    }
  }

  // content stream: draw image
  const cs = `q ${pageW.toFixed(4)} 0 0 ${pageH.toFixed(4)} 0 0 cm /Im0 Do Q`;
  const csBuf = Buffer.from(cs);

  obj(1, `<< /Type /Catalog /Pages 2 0 R >>`);
  obj(2, `<< /Type /Pages /Kids [3 0 R] /Count 1 >>`);
  obj(3, `<< /Type /Page /Parent 2 0 R\n   /MediaBox [0 0 ${pageW.toFixed(4)} ${pageH.toFixed(4)}]\n   /Contents 4 0 R\n   /Resources << /XObject << /Im0 5 0 R >> >> >>`);
  obj(4, `<< /Length ${csBuf.length} >>`, csBuf);
  obj(5, `<< /Type /XObject /Subtype /Image\n   /Width ${imgW} /Height ${imgH}\n   /ColorSpace /DeviceRGB /BitsPerComponent 8\n   /Filter /DCTDecode /Length ${jpegBuf.length} >>`, jpegBuf);

  const xrefOffset = parts.reduce((a, b) => a + b.length, 0);
  const count = 6;
  let xref = `xref\n0 ${count}\n0000000000 65535 f \n`;
  for (let i = 1; i < count; i++) {
    xref += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
  }
  xref += `trailer\n<< /Size ${count} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  parts.push(Buffer.from(xref));

  return Buffer.concat(parts);
}

const [,,a,b] = process.argv;
if (!a || !b) { console.error('用法: node scripts/screenshot-to-pdf.js <html> <pdf>'); process.exit(1); }
run(a, b).catch(e => { console.error(e); process.exit(1); });
