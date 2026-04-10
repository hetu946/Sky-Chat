# Sky Chat

AI 聊天应用，支持多模型对话、语音交互、文件上传。

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **数据库**: PostgreSQL + Prisma ORM
- **认证**: NextAuth.js v4 (Google/GitHub/邮箱登录)
- **状态管理**: Zustand
- **UI**: Tailwind CSS + shadcn/ui
- **AI**: 硅基流动 API (对话/语音/思考模式)

## 功能

### 对话
- 流式响应（SSE）
- 多模型切换（Qwen/DeepSeek）
- 思考模式（推理过程可视化）
- 会话管理（创建/删除/重命名/置顶）
- 消息操作（复制/朗读/重试）

### 语音
- **语音输入**: 录音转文字（SenseVoice）
- **语音输出**: 文字转语音（CosyVoice2，8 种音色）
- 语音选择持久化

### 文件
- 上传 `.txt` / `.md` 文件（最大 1MB）
- 后端读取内容并加入对话上下文

### 其他
- 深色模式
- 导出对话（Markdown）
- 响应式布局

## 开发

### 环境要求

- Node.js v22.20.0
- PostgreSQL
- pnpm

### 安装

```bash
pnpm install
```

### 配置

复制 `.env.example` 为 `.env.local` 并填写配置：

```bash
cp .env.example .env.local
```

主要配置项：

```bash
# 数据库（本地开发使用 Docker）
DATABASE_URL="postgresql://skychat:password123@127.0.0.1:5433/skychat"

# Auth.js（生产环境必须使用强随机密钥）
AUTH_SECRET="your-strong-secret-key-here"
AUTH_TRUST_HOST="true"

# OAuth（可选，不配置则只能使用邮箱登录）
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# 硅基流动 API
SILICONFLOW_API_KEY="your-api-key"
```

> **提示：** Vercel 部署时需要在项目设置中配置环境变量，不要将 `.env.local` 提交到 Git。

### 数据库

```bash
# 生成 Prisma Client
pnpm prisma generate

# 运行迁移
pnpm prisma migrate dev

# 填充测试数据（可选）
pnpm db:seed
```

### 运行

```bash
# 开发模式
pnpm dev

# 生产构建
pnpm build
pnpm start
```

## 脚本

```bash
# 清除 console.log（预览）
pnpm run clean:logs

# 清除 console.log（执行）
pnpm run clean:logs --write

# 数据库管理
pnpm db:studio    # Prisma Studio
pnpm db:seed      # 填充测试数据
pnpm db:reset     # 重置数据库
```

## 项目结构

```
app/                    # Next.js App Router
├── api/               # API 路由
├── auth/              # 认证页面
└── chat/              # 聊天页面

components/            # 全局组件
├── ui/               # shadcn/ui 组件
└── ...

features/              # 功能模块
├── auth/             # 认证
├── chat/             # 对话
├── conversation/     # 会话管理
├── share/            # 分享
└── voice/            # 语音

lib/                   # 工具库
├── hooks/            # React Hooks
├── services/         # API 服务
└── utils/            # 工具函数

server/                # 服务端代码
├── auth/             # Auth.js 配置
├── db/               # 数据库
└── services/         # 业务逻辑

prisma/                # Prisma 配置
└── schema.prisma     # 数据库模型
```

## License

MIT
