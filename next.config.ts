import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  // 排除大文件和不必要的依赖，减小 Serverless Function 体积（应用到所有路由）
  outputFileTracingExcludes: {
    '/**': [
      // Prisma 引擎文件 - 标准路径
      '**/node_modules/@prisma/engines/**',
      '**/node_modules/prisma/**',
      '**/node_modules/.prisma/**',
      '**/node_modules/@prisma/client/libquery_engine-*',
      '**/node_modules/@prisma/client/generator-build/**',
      // Prisma 引擎文件 - pnpm 虚拟存储路径（关键！）
      '**/node_modules/.pnpm/@prisma+client@*/**/node_modules/.prisma/**',
      '**/node_modules/.pnpm/@prisma+engines@*/**',
      '**/node_modules/.pnpm/prisma@*/**',
      // Windows/macOS Prisma 引擎二进制（Vercel 只需要 Linux 版本）
      '**/*.dll.node',
      '**/*darwin*',
      '**/*win32*',
      '**/*windows*',

      // pnpm 虚拟存储目录 - Vercel 上不需要
      '**/node_modules/.pnpm/**',

      // Windows 和 macOS 的 swc 编译文件（只在 Linux 上运行）
      '**/node_modules/@next/swc-win32-x64-msvc/**',
      '**/node_modules/@next/swc-win32-ia32-msvc/**',
      '**/node_modules/@next/swc-darwin-x64/**',
      '**/node_modules/@next/swc-darwin-arm64/**',
      '**/node_modules/@next/swc-linux-arm64-gnu/**',
      '**/node_modules/@next/swc-linux-arm64-musl/**',
      '**/node_modules/@next/swc-freebsd-x64/**',

      // recharts 和 d3 相关 - 图表组件使用动态导入
      '**/node_modules/recharts/**',
      '**/node_modules/d3-scale/**',
      '**/node_modules/d3-shape/**',
      '**/node_modules/d3-time/**',
      '**/node_modules/d3-array/**',
      '**/node_modules/d3-color/**',
      '**/node_modules/d3-interpolate/**',
      '**/node_modules/d3-path/**',
      '**/node_modules/d3-time-format/**',
      '**/node_modules/d3-format/**',
      '**/node_modules/d3-selection/**',
      '**/node_modules/d3-transition/**',
      '**/node_modules/d3-axis/**',
      '**/node_modules/d3-brush/**',
      '**/node_modules/d3-contour/**',
      '**/node_modules/d3-drag/**',
      '**/node_modules/d3-ease/**',
      '**/node_modules/d3-polygon/**',
      '**/node_modules/d3-quadtree/**',
      '**/node_modules/d3-random/**',
      '**/node_modules/d3-scale-chromatic/**',
      '**/node_modules/d3-shape/**',
      '**/node_modules/internmap/**',
      '**/node_modules/delaunator/**',
      '**/node_modules/robust-predicates/**',

      // rrweb-player - 只在客户端使用
      '**/node_modules/rrweb-player/**',
      '**/node_modules/rrweb/**',

      // 大型开发工具和测试库
      '**/node_modules/.cache/**',
      '**/node_modules/@types/**',
      '**/node_modules/@babel/**',
      '**/node_modules/.eslintcache',

      // highlight.js 只在客户端使用（通过 CDN 加载样式）
      '**/node_modules/highlight.js/**',
      '**/node_modules/highlightjs/**',
      // pnpm 虚拟存储中的 highlight.js
      '**/.pnpm/highlight.js@*/**',

      // markdown 相关库 - 使用动态导入
      '**/node_modules/remark-gfm/**',
      '**/node_modules/remark-html/**',
      '**/node_modules/remark-parse/**',
      '**/node_modules/remark/**',
      '**/node_modules/unified/**',
      '**/node_modules/mdast-*/**',
      '**/node_modules/micromark*/**',
      '**/node_modules/estree-util-*/**',
      '**/node_modules/vfile*/**',
      '**/node_modules/trough/**',

      // rehype 相关
      '**/node_modules/rehype-raw/**',
      '**/node_modules/rehype-highlight/**',
      '**/node_modules/rehype-stringify/**',
      '**/node_modules/rehype-parse/**',
      '**/node_modules/hast*/**',

      // 开发文件和文档
      '**/*.map',
      '**/README*',
      '**/CHANGELOG*',
      '**/LICENSE*',
      '**/HISTORY*',
      '**/AGENTS.md',
      '**/CONTRIBUTING.md',
      '**/DEVELOPING.md',
      '**/*.md',

      // 测试文件
      '**/__tests__/**',
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/jest.config.*',
      '**/vitest.config.*',

      // 配置文件
      '**/.eslintrc*',
      '**/.prettierrc*',
      '**/tsconfig*.json',
      '**/.git/**',

      // 其他大文件
      '**/*.hbs',
      '**/templates/**',

      // 本地包 - Vercel 上不需要
      '**/packages/sky-monitor-sdk/**',
    ],
  },

  // 服务器端需要外部化的包（不打包，直接在运行时加载）
  serverExternalPackages: [
    '@prisma/client',
    'prisma',
    // markdown/rehype 生态 - 服务端 SSR 用到，但体积大，外部化避免打包进 serverless function
    'remark',
    'remark-gfm',
    'remark-html',
    'remark-parse',
    'rehype',
    'rehype-highlight',
    'rehype-raw',
    'rehype-stringify',
    'rehype-parse',
    'unified',
    'mdast-util-from-markdown',
    'mdast-util-to-hast',
    'mdast-util-gfm',
    'micromark',
    'micromark-extension-gfm',
    'hast-util-to-html',
    'hast-util-raw',
    'lowlight',
    'highlight.js',
  ],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },

  // 生产环境移除 console.log
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
}

export default withBundleAnalyzer(nextConfig)
