# 吴优 CV 项目

这是吴优的个人简历与求职材料项目，包含线上主页、方向简历母版、JD 定制投递页，以及与 Sketch 精修文件并行的版本记录。

线上主页：

- 主域名：https://wuyou.uk
- 备用域名：https://cv-wuyou.vercel.app

## 项目定位

本项目不是单一简历文件，而是一个简历生产与管理工作区：

- `index.html`：线上个人主页
- `base.html`：简历完整内容库
- `template.html`：PDF 版样式模板
- `versions/`：按方向沉淀的简历母版
- `resumes/`：针对具体公司/JD 的投递版本
- Sketch 文件：用于日常精修视觉版式

## 目录结构

```text
CV网站/
├── index.html                 # 线上主页，确认前不要直接改
├── index-preview.html          # 主页预览稿
├── base.html                   # 简历内容母版
├── template.html               # PDF 样式模板
├── avatar.jpg                  # 头像素材
├── hero-bg*.png                # 主页视觉素材
├── .env.example                # 环境变量示例，不含真实密钥
├── docs/
│   └── project-structure.md    # 更详细的架构说明
├── versions/
│   └── C/
│       └── C75/
│           ├── content.md      # C75 文字快照
│           └── sketch.md       # C75 Sketch 同步记录
├── resumes/
│   └── 公司-岗位/
│       ├── jd.md
│       ├── index.html
│       ├── 公司-岗位.html
│       └── 公司-岗位.pdf
├── drafts/                     # 历史草稿，本地留存
├── scripts/                    # 导出、截图、PDF 辅助脚本
└── AGENTS.example.md           # 无密钥 agent 工作说明示例
```

更完整的结构说明见 [docs/project-structure.md](docs/project-structure.md)。

## 简历版本命名

- `C`：面向车企方向，例如智能座舱、车载 AI、出行体验。
- `P`：面向互联网方向，例如 AI 产品、增长、平台、C 端体验。
- 数字如 `75`：编辑日期，`75` 表示 7 月 5 日编辑版。

当前已记录的方向母版：

- `versions/C/C75/`：车企方向，7 月 5 日编辑版。

## Sketch 精修工作流

Sketch 文件不在本仓库内：

```text
/Users/ice/Desktop/简历.sketch
```

当前 C75 对应 Sketch frame：

```text
吴优简历C75
```

原则：

- Sketch 负责视觉与排版精修。
- `versions/` 负责文字内容与同步状态。
- 修改 Sketch 前先只读检查目标文档、页面、frame 和图层。
- Sketch 内容变动后，同步更新对应 `versions/*/*/content.md`。

## 开发与预览

安装依赖：

```bash
npm install
```

本地静态预览：

```bash
python3 -m http.server 8765
```

打开：

```text
http://localhost:8765
```

## 主页修改规则

- 不直接修改 `index.html`。
- 主页改动先写入 `index-preview.html`。
- 用户确认后，再将 `index-preview.html` 覆盖到 `index.html`。
- 确认或放弃后的预览稿归档到 `drafts/`。

## JD 定制简历工作流

当有具体 JD 时，建议创建：

```text
resumes/公司-岗位/
├── jd.md
├── index.html
├── 公司-岗位.html
└── 公司-岗位.pdf
```

职责区分：

- `versions/`：方向母版，不绑定具体公司。
- `resumes/`：具体投递版本，绑定公司和岗位。
- `drafts/`：历史尝试和未定稿预览。

## 部署

本项目通过 GitHub 连接 Vercel 自动部署。

```bash
git push
```

部署后：

- 主页：`https://wuyou.uk`
- 定制页：`https://wuyou.uk/公司-岗位`

`vercel.json` 中配置了 slug rewrite：

```json
{
  "rewrites": [
    { "source": "/:slug", "destination": "/resumes/:slug/index.html" }
  ]
}
```

## 安全规则

- 不提交密钥、Token、账号 ID 或本地 MCP 地址中的敏感配置。
- 真实密钥放在本地 `.env`，仓库只提交 `.env.example`。
- 真实 `AGENTS.md`、`CLAUDE.md`、`.claude/settings.local.json` 保持本地忽略。
- 对外可提交的 agent 说明使用 `AGENTS.example.md`。
- `node_modules/` 不进入 Git。

## 当前状态

- C75 已同步为项目内文字快照。
- C75 已同步到 `index.html`、`base.html`、`template.html`。
- 当前 PDF 导出链路仍需后续统一到高质量矢量导出。
