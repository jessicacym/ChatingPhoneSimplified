# 🔧 Vercel Dashboard 手动配置指南

## 问题分析

Vercel 正在自动检测您的项目为 Vite 项目，并强制运行 `vite build`，即使我们已经修改了配置文件。

## ✅ 最新修复（刚刚完成）

1. 在 `vercel.json` 中添加了 `"framework": null` 禁用自动检测
2. 移除了 `package.json` 中的 `build` 脚本

## 🚀 请按照以下步骤操作

### 步骤 1: 提交并推送最新更改

```bash
git add .
git commit -m "Disable Vercel framework detection"
git push
```

### 步骤 2: 在 Vercel Dashboard 中手动配置

如果推送后仍然失败，请在 Vercel 中手动配置：

#### A. 打开项目设置

1. 在 Vercel Dashboard，点击您的项目
2. 点击顶部的 **"Settings"** 标签页
3. 在左侧菜单中选择 **"General"**

#### B. 配置构建设置

向下滚动找到 **"Build & Development Settings"** 部分：

**Framework Preset（框架预设）**
- 选择：**Other** 或 **None**
- 不要选择 "Vite"

**Build Command（构建命令）**
- 留空或输入：`echo "No build needed"`
- 或者切换开关到 **"OVERRIDE"** 并留空

**Output Directory（输出目录）**
- 留空
- 或者切换开关到 **"OVERRIDE"** 并留空

**Install Command（安装命令）**
- 保持默认：`npm install`
- 或留空

#### C. 保存并重新部署

1. 点击页面底部的 **"Save"** 按钮
2. 返回 **"Deployments"** 标签页
3. 点击最新的失败部署
4. 点击右上角的 **"Redeploy"** 按钮

### 步骤 3: 另一种方法 - 使用 Settings Override

如果上述方法不行，尝试这个：

1. 在项目的 **Settings** → **General** 中
2. 找到 **"Build & Development Settings"**
3. 点击 **"Edit"** 按钮
4. 启用所有 OVERRIDE 开关：
   - ✅ **Build Command Override**: 留空或 `exit 0`
   - ✅ **Output Directory Override**: 留空
   - ✅ **Install Command Override**: `npm install`

### 步骤 4: 最后的手段 - 删除并重新创建

如果仍然不行：

1. **导出环境变量**（如果有的话）
2. 在 Vercel Dashboard 中**删除整个项目**
3. 点击 **"Add New Project"**
4. 重新连接 GitHub 仓库
5. 在配置页面：
   - **Framework Preset**: 选择 **"Other"**
   - **Build Command**: 留空
   - **Output Directory**: 留空
   - 点击 **"Deploy"**

## 📋 预期的正确部署流程

成功配置后，Build Logs 应该显示：

```
Installing dependencies...
✓ added 165 packages

(没有运行 vite build)
(没有寻找 dist 目录)

✓ Build completed
✓ Deploying...
✓ Ready
```

## 🎯 验证配置

部署成功的标志：
- ✅ Build Logs 中**没有** `vite build` 命令
- ✅ Build Logs 中**没有** "dist" 相关错误
- ✅ 状态显示 **"Ready"**
- ✅ 可以访问网站
- ✅ [index.html](index.html) 正常加载
- ✅ API 端点 `/api/chat/get` 和 `/api/chat/save` 工作正常

## 📸 需要的 Vercel 设置截图参考

**Build & Development Settings 应该看起来像这样：**

```
Framework Preset: Other
Build Command: (empty or "exit 0")
Output Directory: (empty)
Install Command: npm install
```

## ❓ 如果还是不行

请提供：
1. Vercel Settings → General → Build & Development Settings 的截图
2. 最新的 Build Logs 完整错误信息
3. 确认是否有看到我们的 `vercel.json` 配置被使用

## 📚 相关文件

- [vercel.json](vercel.json) - 已添加 `"framework": null`
- [package.json](package.json) - 已移除 `build` 脚本
- [DEPLOYMENT_FIX.md](DEPLOYMENT_FIX.md) - 之前的修复指南
