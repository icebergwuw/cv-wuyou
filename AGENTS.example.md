# Agent 工作说明示例

这是可提交的无密钥版本。真实本地操作手册请使用 `AGENTS.md`，并保持在 `.gitignore` 中。

## 项目背景

本项目用于管理吴优的个人主页、简历母版、方向版本与 JD 定制投递页。

核心文件：

- `index.html`：线上主页
- `index-preview.html`：主页预览稿
- `base.html`：简历内容母版
- `template.html`：PDF 样式模板
- `versions/`：方向母版
- `resumes/`：JD 定制投递版本
- `docs/project-structure.md`：项目结构说明

## 基本规则

- 不要直接修改 `index.html`。
- 主页类修改先写入 `index-preview.html`。
- 用户确认后再覆盖 `index.html`。
- 不要提交密钥、Token、账号 ID、私有 MCP 地址或本地敏感配置。
- 不要提交 `node_modules/`。
- 不要无关移动图片素材或改线上路径。

## 简历方向命名

- `C`：车企方向。
- `P`：互联网方向。
- 数字表示编辑日期，例如 `75` 表示 7 月 5 日编辑版。

示例：

```text
versions/C/C75/
├── content.md
└── sketch.md
```

## Sketch 工作流

Sketch 是日常精修源，仓库中的 `versions/` 是文字与同步记录源。

操作原则：

- 修改 Sketch 前先只读检查当前文档、页面、frame 和目标图层。
- 只改目标 frame 或目标图层。
- 修改后同步更新对应 `versions/*/*/content.md` 或 `sketch.md`。
- 不要把 Sketch 的临时导出结果误当成项目主源。

## JD 定制工作流

针对具体岗位，创建：

```text
resumes/公司-岗位/
├── jd.md
├── index.html
├── 公司-岗位.html
└── 公司-岗位.pdf
```

原则：

- `jd.md` 保存原始 JD。
- `index.html` 是定制网页版。
- PDF/HTML 导出物是否提交，按当前 `.gitignore` 和用户要求决定。
- 定制版本不要覆盖方向母版，方向母版放在 `versions/`。

## 当前重要状态

- C75 已有项目内记录：`versions/C/C75/`
- C75 尚未同步到 `base.html`、`template.html`、`index.html`
- 真实本地 `AGENTS.md` 可能包含敏感信息，不要提交
