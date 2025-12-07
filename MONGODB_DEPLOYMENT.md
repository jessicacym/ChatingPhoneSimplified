# MongoDB Chat History - Deployment Guide

## 概述

已完成 MongoDB 集成，聊天历史现在可以跨设备同步。

## 文件结构

```
ChatingPhoneSimplified/
├── index.html                 # 前端聊天界面（已更新使用 MongoDB）
├── api/                       # Vercel 无服务器 API
│   ├── lib/
│   │   └── mongodb.js        # MongoDB 连接工具
│   └── chat/
│       ├── get.js            # 获取聊天历史 API
│       └── save.js           # 保存聊天历史 API
├── package.json              # 已添加 mongodb 依赖
└── vercel.json               # Vercel 部署配置
```

## 部署到 Vercel

### 步骤 1: 安装 Vercel CLI（可选）

```bash
npm install -g vercel
```

### 步骤 2: 使用 Vercel 网站部署（推荐）

1. 访问 https://vercel.com
2. 使用 GitHub/GitLab/Bitbucket 登录
3. 点击 "Add New Project"
4. 导入您的项目仓库（或上传项目文件夹）
5. Vercel 会自动检测配置
6. 点击 "Deploy"

### 步骤 3: 或使用 CLI 部署

在项目根目录运行：

```bash
vercel
```

按照提示操作：
- 设置项目名称
- 确认构建设置（已在 vercel.json 中配置）
- 等待部署完成

### 步骤 4: 获取部署 URL

部署完成后，您会得到一个 URL，例如：
```
https://your-project-name.vercel.app
```

## MongoDB 配置

### 当前配置

MongoDB 连接字符串已在以下文件中配置：
- `vercel.json` (环境变量)
- `api/lib/mongodb.js` (备用硬编码)

当前使用：
- **Database**: `chat_app`
- **Collection**: `chat_history`
- **用户ID**: 自动生成并保存在 localStorage

### 数据结构

MongoDB 中每个文档的格式：

```javascript
{
  _id: ObjectId,
  userId: "user_abc123",
  messages: [
    { role: "user", content: "Hello" },
    { role: "assistant", content: "Hey..." }
  ],
  updatedAt: "2025-12-07T10:30:00.000Z"
}
```

## API 端点

部署后，以下 API 将可用：

### GET /api/chat/get
获取指定用户的聊天历史

**请求：**
```javascript
POST /api/chat/get
Content-Type: application/json

{
  "userId": "user_abc123"
}
```

**响应：**
```javascript
{
  "messages": [...],
  "updatedAt": "2025-12-07T10:30:00.000Z"
}
```

### POST /api/chat/save
保存聊天历史

**请求：**
```javascript
POST /api/chat/save
Content-Type: application/json

{
  "userId": "user_abc123",
  "messages": [...],
  "updatedAt": "2025-12-07T10:30:00.000Z"
}
```

**响应：**
```javascript
{
  "success": true,
  "matched": 1,
  "modified": 1,
  "upserted": 0
}
```

## 本地测试

### 使用 Vercel Dev（推荐）

```bash
vercel dev
```

这会在本地启动开发服务器，API 端点可用：
- http://localhost:3000/api/chat/get
- http://localhost:3000/api/chat/save

### 使用其他本地服务器

如果使用其他本地服务器（如 Live Server），API 调用会失败。
建议使用 `vercel dev` 进行本地测试。

## 故障排除

### Vercel 部署错误："No Output Directory named 'dist' found"

**问题**：部署失败，显示 `Error: No Output Directory named "dist" found after the Build completed.`

**原因**：之前的配置尝试使用 Vite 构建，但项目结构不适合 Vite 构建流程。

**解决方案**：已更新配置使用静态部署方式。确保您的文件包含：

✅ [vercel.json](vercel.json) 使用 `@vercel/static` 和 `@vercel/node`
✅ [package.json](package.json) build 脚本不执行实际构建

如果仍然遇到问题：
1. 删除项目并重新部署
2. 在 Vercel Dashboard 中确认使用最新的代码
3. 检查 Build Logs 中的详细错误信息

### MongoDB 连接失败

如果看到 "❌ 从 MongoDB 加载失败，使用 localStorage"：

1. **检查网络连接**：确保可以访问 MongoDB Atlas
2. **检查凭据**：确认 MongoDB 连接字符串正确
3. **检查 API 部署**：确保 Vercel 函数已成功部署
4. **查看日志**：在 Vercel Dashboard 查看函数日志

### CORS 错误

API 端点已配置 CORS，允许所有来源（`*`）。
如果仍有 CORS 错误，检查：
- 浏览器控制台中的具体错误信息
- Vercel 函数日志

### 本地测试无法连接 API

确保使用 `vercel dev` 而不是其他本地服务器。

## 切换回 localStorage

如果需要临时禁用 MongoDB，编辑 `index.html`：

```javascript
const MONGODB_CONFIG = {
    enabled: false,  // 改为 false
    // ...
};
```

## 安全建议

⚠️ **重要**：当前 MongoDB 凭据在代码中可见。

**生产环境建议**：
1. 使用 Vercel 环境变量（在 Dashboard 中设置）
2. 不要在 `vercel.json` 中硬编码凭据
3. 考虑添加 API 认证（如 JWT）

**设置环境变量**：
1. 在 Vercel Dashboard 打开项目
2. 进入 Settings → Environment Variables
3. 添加：
   - `MONGODB_URI`: 您的连接字符串
   - `DB_NAME`: chat_app

## 下一步

1. ✅ 部署到 Vercel
2. ✅ 测试聊天历史同步
3. 🔒 配置环境变量（推荐）
4. 🔐 添加用户认证（可选）

## 支持

如有问题，请检查：
- Vercel 部署日志
- 浏览器控制台
- MongoDB Atlas 日志
