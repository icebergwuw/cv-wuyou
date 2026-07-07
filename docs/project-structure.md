# 项目结构说明

本项目同时承担三件事：个人主页、简历方向母版、针对 JD 的定制投递页。为避免混乱，目录按“线上入口 / 方向版本 / JD 定制 / 本地草稿”分层。

## 当前结构

```text
CV网站/
├── index.html                 # 线上主页，禁止直接改；确认后才由 preview 覆盖
├── index-preview.html          # 当前主页预览稿
├── base.html                   # 简历完整内容库
├── template.html               # PDF 样式模板
├── avatar.jpg                  # 线上与 PDF 共用头像
├── hero-bg.png                 # 主页视觉素材
├── hero-bg-new.png             # 主页视觉素材候选
├── package.json
├── package-lock.json
├── vercel.json
├── docs/
│   └── project-structure.md    # 本文件
├── versions/
│   └── C/
│       └── C75/
│           ├── content.md      # C75 文字快照
│           └── sketch.md       # C75 Sketch 同步记录
├── resumes/
│   └── xpeng-ai-pm/
│       ├── jd.md               # JD 原文
│       └── index.html          # 定制网页入口
├── drafts/                     # 历史预览草稿，本地留存
├── scripts/                    # 导出、截图、PDF 辅助脚本
└── node_modules/               # 本地依赖，不再进入 Git
```

## 版本命名

- `C`：面向车企方向，例如智能座舱、车载 AI、出行体验。
- `P`：面向互联网方向，例如 AI 产品、增长、平台、C 端体验。
- 数字如 `75`：编辑日期，`75` 表示 7 月 5 日编辑版。

## 目录职责

### 线上入口

- `index.html` 是线上主页。
- `index-preview.html` 是预览稿。
- 任何主页改动先进入 `index-preview.html`，确认后再覆盖 `index.html`。

### 方向版本

- `versions/C/C75/` 是通用车企方向母版。
- 之后若有互联网方向，可新增 `versions/P/Pxx/`。
- 方向母版记录“可复用简历内容”，不绑定某个公司 JD。

### JD 定制版

- `resumes/公司-岗位/` 用于具体投递版本。
- 每个目录应至少包含 `jd.md` 和 `index.html`。
- PDF/HTML 导出产物可以保留在本地，但是否纳入 Git 需要按投递需求决定。

### Sketch 精修源

- Sketch 文件：`/Users/ice/Desktop/简历.sketch`
- 当前 C75 frame：`吴优简历C75`
- Sketch 负责视觉与排版精修；`versions/` 负责文字与版本追踪。

## 当前同步状态

- C75 已有项目内文字快照：`versions/C/C75/content.md`
- C75 已有 Sketch 同步记录：`versions/C/C75/sketch.md`
- C75 已同步到 `index.html`、`base.html`、`template.html`
- C75 尚未作为 PDF 导出物进入项目

## 后续整理建议

1. 保留根目录里的线上入口和核心模板，不急着搬动，避免破坏部署路径。
2. 将历史 PDF 归档到 `archive/original-pdfs/`，但需要先确认是否仍要被 Git 跟踪。
3. 将 `hero-bg*.png` 和 `avatar.jpg` 迁入 `assets/` 前，需要同步检查并修改 HTML 引用路径。
4. 将临时截图、测试脚本保持 ignore；真正复用的脚本再放入 `scripts/`。
5. 提交前确认 `.gitignore` 已挡住本地密钥、临时文件和 `node_modules/`。
