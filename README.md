# AI 自动获客演示系统

这是一个纯前端演示系统，用于展示通过自然语言创建获客任务、模拟采集抖音/小红书作品评论，并筛选意向客户的产品流程。

当前版本不包含真实平台抓取、账号登录、后端接口或云端数据同步，所有数据和交互均为前端演示数据。

## 技术栈

- React
- Vite
- lucide-react

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## 页面功能

- 首页：自动获客和 AI 获客产品介绍
- AI 交代任务：用一句话创建采集任务
- 工作台：查看获客任务和客户统计
- 采集数据：模拟搜索视频、打开视频、翻阅评论、逐条采集
- 意向客户：按行业、平台、意向等级和关键词筛选客户
- 演示行业：家具、少儿编程、私教减脂、装修、医美、二手房、二手车

## 交给 WorkBuddy 部署

直接把本仓库地址交给 WorkBuddy：

`https://github.com/wenku365-sudo/ailead`

让它读取项目后执行：

```bash
npm install
npm run build
```

如果需要继续开发，要求它在现有 React/Vite 项目基础上修改，不要重写成后端项目。

## 在线演示

`https://wenku365-sudo.github.io/ailead/`
