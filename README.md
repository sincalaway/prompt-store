# Prompt Store

> 面向 AI 绘画工作流的双语提示词管理与组合工具。

Prompt Store 适用于 Stable Diffusion、ComfyUI 等 AI 绘画场景，帮助你快速浏览分类、搜索标签、组合提示词、调整权重，并将结果复制到创作工具中。

[![GitHub](https://img.shields.io/badge/GitHub-sincalaway%2Fprompt--store-181717?logo=github)](https://github.com/sincalaway/prompt-store)
[![Vue](https://img.shields.io/badge/Vue-3-42b883?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)](https://vite.dev/)

## 目录

- [功能概览](#功能概览)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [常用命令](#常用命令)
- [部署](#部署)
  - [Cloudflare Pages](#cloudflare-pages)
  - [Vercel](#vercel)
  - [Docker](#docker)
- [项目结构](#项目结构)
- [扩展提示词数据](#扩展提示词数据)
- [数据与状态](#数据与状态)
- [开发说明](#开发说明)

## 功能概览

### 提示词浏览与搜索

- 按主分类和子分类浏览提示词。
- 支持中文、英文关键词搜索。
- 使用防抖减少频繁搜索带来的开销。
- 搜索结果显示来源分类，方便快速定位。
- 分类数据采用动态加载，减少首屏资源压力。

### 高级筛选

点击搜索框旁的 **筛选** 按钮，可组合使用以下条件：

- 主分类
- 子分类
- 多个中文或英文标签
- 标签匹配模式：**包含全部关键词** 或 **匹配任一关键词**
- SFW / NSFW 内容模式

搜索框中的多个关键词可以使用空格、英文逗号或中文逗号分隔。

### 已选提示词管理

- 点击提示词加入或移除已选列表。
- 通过拖拽调整提示词顺序。
- 点击已选提示词展开权重控制。
- 权重范围为 `0.1–5.0`，步长为 `0.1`。
- 支持单项删除、全部清空和清空撤销。
- 已选内容会保存到浏览器 `localStorage`。

### 复制与格式化

操作栏提供以下复制方式：

- **复制全部英文**：保留当前顺序和权重格式。
- **复制格式化提示词**：清理多余空白、按英文内容去重，并统一使用 `, ` 分隔。
- **复制全部中文**：复制中文提示词列表。

非 `1.0` 权重会输出为 Stable Diffusion 常用格式，例如：

```text
(masterpiece:1.2), detailed background, soft lighting
```

### 导入与导出

- 以 JSON 格式导出已选提示词。
- 从 JSON 文本或文件导入提示词。
- 支持合并导入或替换现有列表。
- 可选择是否保留权重信息。

### NSFW 内容控制

- SFW 模式默认隐藏 NSFW 分类和提示词。
- 开启 NSFW 后显示完整分类和内容。
- NSFW 状态会在浏览器中短期保存。

## 技术栈

| 技术 | 用途 | 版本 |
| :--- | :--- | :--- |
| Vue | 前端框架 | `^3.5.43` |
| Pinia | 状态管理 | `^4.0.3` |
| TypeScript | 类型系统 | `~5.9.3` |
| Vite | 构建工具 | `^8.3.2` |
| Sass | 样式预处理 | `^1.105.1` |
| vue-tsc | Vue 类型检查 | `^3.3.12` |

> 项目当前不使用 Vue Router，因此未将其作为依赖保留。

## 快速开始

### 环境要求

- Node.js `20.19.x` 或更高版本，或 `22.12.x` 及以上版本
- npm `8.x` 或更高版本

### 安装与启动

```bash
git clone https://github.com/sincalaway/prompt-store.git
cd prompt-store
npm install
npm run dev
```

开发服务器启动后访问：<http://localhost:5173>

### 生产构建

```bash
npm run build
npm run preview
```

预览服务器默认地址：<http://localhost:4173>

## 常用命令

| 命令 | 说明 |
| :--- | :--- |
| `npm install` | 安装依赖 |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 类型检查并构建生产版本 |
| `npm run preview` | 预览生产构建 |
| `npm audit` | 检查依赖安全问题 |

## 部署

本项目是标准 Vite 静态站点，生产构建目录为 `dist`。

### Cloudflare Pages

#### 控制台部署

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)，进入 **Workers & Pages**。
2. 选择 **Create application → Pages → Connect to Git**。
3. 授权 GitHub，并选择 `sincalaway/prompt-store`。
4. 使用以下构建配置：

   | 配置项 | 值 |
   | :--- | :--- |
   | Framework preset | `Vite或vue` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | `/` |
   | Node.js version | `20` 或更高版本 |

5. 点击 **Save and Deploy**。
6. 部署完成后，可在 **Custom domains** 中绑定域名。

#### Wrangler CLI 部署

```bash
npm install
npm run build
npx wrangler login
npx wrangler pages deploy dist --project-name prompt-store
```

### Vercel

#### 控制台部署

1. 登录 [Vercel](https://vercel.com/)，选择 **Add New → Project**。
2. 导入 GitHub 仓库 `sincalaway/prompt-store`。
3. 确认以下配置：

   | 配置项 | 值 |
   | :--- | :--- |
   | Framework Preset | `Vite` |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |
   | Root Directory | `./` |

4. 点击 **Deploy**。
5. 部署完成后，可在 **Settings → Domains** 中绑定域名。

#### Vercel CLI 部署

```bash
npm install -g vercel
vercel
vercel --prod
```

### Docker

项目包含 `Dockerfile`，可以使用以下命令构建和运行：

```bash
docker build -t prompt-store .
docker run -d \
  --name prompt-store \
  --restart unless-stopped \
  -p 8080:80 \
  prompt-store
```

访问 <http://localhost:8080> 查看站点。

停止并删除容器：

```bash
docker stop prompt-store
docker rm prompt-store
```

## 项目结构

```text
prompt-store/
├── index.html                 # HTML 入口
├── package.json               # 项目配置与依赖
├── package-lock.json          # 依赖锁文件
├── vite.config.ts             # Vite 配置
├── Dockerfile                # Docker 构建配置
├── README.md                 # 项目文档
├── public/
│   └── manus-routes.json      # 页面路由清单
└── src/
    ├── App.vue                # 根组件与工作台布局
    ├── main.ts                # 应用入口与数据预加载
    ├── style.css              # 全局主题与响应式样式
    ├── components/
    │   ├── ActionBar.vue      # 复制、导入、导出和清空操作
    │   ├── BilingualTag.vue   # 已选双语提示词卡片
    │   ├── ImportExport.vue   # JSON 导入导出
    │   ├── LeftPanel.vue      # 主分类导航
    │   ├── RightPanel.vue     # 搜索与高级筛选
    │   ├── SearchBar.vue      # 搜索输入框
    │   ├── SelectedSection.vue # 已选提示词区域
    │   ├── SubButtonSection.vue # 分类与搜索结果
    │   └── styles/            # 组件基础 SCSS
    ├── data/
    │   ├── categoryConfig.ts  # 分类和子分类配置
    │   ├── loader.ts           # 提示词动态加载器
    │   └── */                  # 各分类提示词数据
    ├── stores/
    │   └── promptStore.ts      # Pinia 状态管理
    ├── types/
    │   └── index.ts            # TypeScript 类型定义
    └── utils/
        └── debounce.ts         # 防抖工具
```

## 扩展提示词数据

### 添加主分类

编辑 `src/data/categoryConfig.ts`：

```ts
{
  id: "your-category-id",
  label: "你的分类名称",
  icon: "✨",
  nsfw: false,
  subCategories: []
}
```

### 添加子分类

在主分类的 `subCategories` 中增加：

```ts
{
  key: "your-sub-key",
  label: "子分类名称",
  fileName: "your-file-name",
  nsfw: false
}
```

### 添加提示词文件

在对应分类目录创建 `your-file-name.ts`：

```ts
import type { PromptItem } from "../../types";

export const items: PromptItem[] = [
  {
    chinese: "中文提示词",
    english: "english prompt"
  },
  {
    chinese: "敏感内容",
    english: "nsfw content",
    nsfw: true
  }
];
```

`fileName` 必须与数据文件名一致，数据文件会由 `loader.ts` 动态加载。

## 数据与状态

| 内容 | 存储位置 | 默认有效期 |
| :--- | :--- | :--- |
| 已选提示词 | `localStorage` | 1 小时 |
| NSFW 状态 | `localStorage` | 1 小时 |
| 当前主分类 | `localStorage` | 1 小时 |
| 子分类状态 | `localStorage` | 1 小时 |

用户数据只保存在当前浏览器中，不会自动上传到服务器。

## 开发说明

- 提交代码前运行 `npm run build`，确保类型检查和生产构建通过。
- 运行 `npm audit` 检查依赖安全状态。
- 不要提交 `node_modules`、`dist`、`.env` 或本地日志文件。
- 新增分类数据时，保持 `categoryConfig.ts` 和实际数据文件名称一致。
- 项目提示词数据源自 Danbooru，并由 AI 辅助翻译；使用时请遵守相关内容和版权规范。

## 许可证与仓库

- GitHub：<https://github.com/sincalaway/prompt-store>
- Git 克隆地址：<https://github.com/sincalaway/prompt-store.git>
