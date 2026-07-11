const assert = require('assert');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const preview = fs.readFileSync(path.join(root, 'index-preview.html'), 'utf8');

function extract(html, tag) {
  const match = html.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
  assert(match, `Missing <${tag}> block`);
  return match[1];
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

assert.strictEqual(
  sha256(extract(preview, 'style')),
  'c2ff48535aeb74da899e2be0a5608ddcfbd28cb018a112fbf6d99954969a4357',
  'C0712 update must preserve the current homepage CSS exactly'
);
assert.strictEqual(
  sha256(extract(preview, 'script').replace(/document\.title = [^;]+;/, 'document.title = __TITLE__;')),
  '4bf5c7c5c70d2ac8d7c7ad088c41c96e183d8e6e301214f6067c6d18cd8ca952',
  'C0712 update may change document titles but must preserve the language and motion JavaScript'
);

const requiredMarkers = [
  '智能座舱 AI 产品经理',
  '地图导航与语音交互',
  '人机交互硕士',
  'AI Native',
  'Agent 0→1 落地',
  '镁佳科技',
  '长安深蓝',
  '地图 Agent',
  '金山西山居',
  '泰迪科技',
  '54 万条',
  'CDS<br/>交通工具设计学院',
  '约克游',
  'AI Product Manager, Digital Cockpit',
  'Navigation & Voice Interaction',
  'AI-Native',
  '0-to-1 Agent Builder',
  'Megatronix',
  'Changan DEEPAL',
  'Navigation Agent',
  'Cheetah Mobile Group',
  'Kingsoft Seasun',
  'TipDM Technology',
  'CDS Transportation',
  'York Explorer'
];

for (const marker of requiredMarkers) {
  assert(preview.includes(marker), `Missing C0712 marker: ${marker}`);
}

for (const staleMarker of ['Health Guardian · AI Medical Triage', '健康卫士 · AI 医疗导诊']) {
  assert(!preview.includes(staleMarker), `Stale homepage content remains: ${staleMarker}`);
}

assert(preview.includes("localStorage.setItem('cv-lang'"), 'Language preference persistence is missing');
assert(preview.includes('id="langBtn"'), 'Language toggle is missing');

console.log('C0712 homepage preview: content markers and style baseline verified');
