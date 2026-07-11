# C0712 网页同步记录

日期：2026-07-12

## 内容来源

- 中文：`content-zh.md` 与 Sketch frame `吴优简历C0712`
- 英文：`content-en.md` 与 Sketch frame `吴优简历C0712-EN`
- 目标方向：车企智能座舱 / Digital Cockpit AI Product Manager

## 网页边界

- 视觉母版：根目录 `index.html` 在本轮修改前的恢复版本
- 保留：CSS、字体、色板、`hero-bg-new.png`、组件结构、滚动动效、双语切换和响应式规则
- 更新：Hero、关于我、工作与项目、教育、奖项、技能、页脚文字
- 经历顺序：镁佳科技、猎豹移动 EasyClaw、金山西山居、泰迪科技、约克游、CDS
- 网页保留广州大学本科信息；该信息属于稳定教育背景，C0712 PDF 因篇幅未重复展示

## 验证

- 回归脚本：`scripts/check-homepage-c0712.js`
- CSS SHA-256：`c2ff48535aeb74da899e2be0a5608ddcfbd28cb018a112fbf6d99954969a4357`
- 语言与动效脚本保持不变，仅更新中英文页面标题
- 桌面中文、桌面英文、移动英文均完成浏览器检查
- 6 个经历组件、5 个主区块、无横向溢出、无控制台错误

## 发布流程

- 审批稿：`index-preview.html`
- 归档：`drafts/index-preview-2026-07-12-c0712-approved.html`
- 正式页：`index.html`
- 部署：推送 GitHub `main` 后由 Vercel 自动部署至 `https://wuyou.uk`
