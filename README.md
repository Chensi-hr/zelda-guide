# 塞尔达传说：王国之泪 · 全攻略站（TOTK Guide）

> 粉丝自制 · 离线可用 · 纯静态 · 中英双语 · 零依赖 · 可直接发布到 GitHub Pages

《塞尔达传说：王国之泪》攻略网站，包含主线流程、152 座神庙、900 个呀哈哈、装备融合、BOSS、料理与三层互动地图（天空 / 地面 / 地下）。无需构建、无需后端，双击 `index.html` 即可本地打开，也可一键发布到 GitHub Pages 或任意静态托管。

## 功能一览

- 🧭 **主线流程**：四区域神殿 + 魔王城完整推进路线
- 🛕 **152 座神庙**：按区域分类、搜索、解法提示，勾选进度本地保存
- 🌳 **900 个呀哈哈**：分批清单 + 收集计数
- ⚔️ **装备与融合**：余料建造、防具套装、升级材料
- 🗺️ **三层互动地图**：天空 / 地面 / 地下，含坐标网格与标记点
- 💬 **评论区 + 视频嵌入**：本地保存（localStorage）
- 🌍 **中英双语**：`/` 中文版，`/en/` 英文版，双向切换，进度共享
- 🔍 **搜索**：首页与详情页均可搜索

## 目录结构

```
zelda-guide/
├── index.html            中文首页
├── beginner.html         新手指南
├── main-story.html       主线流程
├── shrines.html          神庙（152 座）
├── koroks.html           呀哈哈（900）
├── equipment.html        装备与融合
├── boss.html             BOSS 攻略
├── cooking.html          料理大全
├── map.html              三层互动地图
├── en/                   英文版（9 页，结构同上）
├── styles.css            全局样式（双版共用）
├── common.js             页头/页脚/评论/视频/双语引擎
├── script.js             首页搜索逻辑
├── hero.svg              原创主角剪影
├── .nojekyll             关闭 Jekyll 处理（GitHub Pages 需要）
└── .github/workflows/pages.yml  自动部署到 GitHub Pages
```

## 发布到 GitHub Pages（二选一）

### 方式一：GitHub Actions 自动部署（推荐）

1. 在 GitHub 新建仓库（如 `zelda-guide`），把本文件夹**所有内容**推到仓库根目录：
   ```bash
   git init
   git add .
   git commit -m "init: TOTK guide site"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/<仓库名>.git
   git push -u origin main
   ```
2. 打开仓库 **Settings → Pages**，将 **Source** 选为 **GitHub Actions**。
3. 推送后 Actions 会自动构建并部署，几秒后即可通过
   `https://<你的用户名>.github.io/<仓库名>/` 访问。

### 方式二：分支部署（最简单，不依赖 Actions）

1. 同样把文件推到仓库 `main` 分支根目录。
2. 打开 **Settings → Pages**，将 **Source** 选为 **Deploy from a branch**，分支选 `main`，目录选 `/ (root)`，保存。
3. 等待 1-2 分钟后访问上述地址。

> 提示：网站内全部使用相对路径，部署在子目录（`/仓库名/`）下也能正常工作，无需任何改动。

## 技术说明

- 纯 HTML + CSS + Vanilla JS，无任何外部 CDN / 框架 / 构建步骤，可完全离线运行。
- 数据（神庙、呀哈哈等）内置于各页面 JS 数组，可直接编辑扩充。
- 进度 / 评论 / 视频均存于浏览器 `localStorage`，中英文版共享进度。

## 版权与免责声明

- 本站为 **粉丝自制非官方攻略站**，与任天堂（Nintendo）无关。
- 网站文字内容为原创整理；`hero.svg` 为原创矢量剪影，未使用官方美术素材。
- 《塞尔达传说：王国之泪》及相关商标、素材版权归任天堂所有，本站仅用于个人学习交流，请勿用于商业用途。
