# AI提示词可视化选择器

一个基于React的AI绘图提示词可视化选择工具，帮助用户通过点击快速组合和管理提示词。

## ✨ 功能特性

- 🎯 **分类浏览**：按主要分类和子分类组织提示词
- 🔍 **实时搜索**：快速查找所需的提示词
- 🖱️ **点击选择**：通过点击词汇按钮添加/移除提示词
- 📋 **提示词管理**：底部固定栏显示已选提示词
- 📤 **一键复制**：将所有选中的提示词复制到剪贴板
- 🗑️ **批量清空**：快速清空所有已选提示词
- 📱 **响应式设计**：支持移动端和桌面端

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 📁 项目结构

```
src/
├── components/          # React组件
│   ├── CategoryTab.tsx      # 分类标签组件
│   ├── PromptBar.tsx        # 底部提示词栏
│   ├── PromptChip.tsx       # 提示词芯片组件
│   ├── SearchBar.tsx        # 搜索栏组件
│   └── SubCategoryCard.tsx  # 子分类卡片组件
├── data/               # 数据文件
│   └── promptData.ts       # 提示词数据
├── types/              # TypeScript类型定义
│   └── index.ts
├── App.tsx             # 主应用组件
├── main.tsx            # 应用入口
└── index.css           # 全局样式
```

## 📊 数据结构

提示词数据采用以下JSON格式：

```json
{
  "categories": [
    {
      "mainCategory": "主体 (Subject)",
      "subCategories": [
        {
          "name": "人物 (Character)",
          "phrases": ["Q版古典女神", "BJD人偶", "女主角"]
        }
      ]
    }
  ]
}
```

## 🛠️ 技术栈

- **React 18** - 用户界面框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Vite** - 构建工具
- **Lucide React** - 图标库

## 📝 使用说明

1. **浏览分类**：点击顶部标签切换不同主要分类
2. **选择提示词**：点击词汇按钮将其添加到已选列表
3. **移除提示词**：再次点击已选词汇或点击底部栏中的删除按钮
4. **搜索功能**：在搜索框中输入关键词快速查找
5. **复制提示词**：点击"复制全部"按钮将所有选中的提示词复制到剪贴板
6. **清空选择**：点击"清空全部"按钮移除所有已选提示词

## 🔧 自定义数据

要添加或修改提示词数据，请编辑 `src/data/promptData.ts` 文件。数据格式遵循上述JSON结构。

## 📱 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 📄 许可证

MIT License
