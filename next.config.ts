import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  // 开启文件追踪 - Vercel 专用
  outputFileTracing: true,

  // 排除大文件和不必要的依赖，减小 Serverless Function 体积
  outputFileTracingExcludes: {
    '/': [
      // Prisma 引擎文件 - 运行时动态加载，不需要打包
      './node_modules/@prisma/engines/**',
      './node_modules/prisma/**',
      './node_modules/.prisma/**',
      './node_modules/@prisma/client/libquery_engine*',

      // pnpm 虚拟存储目录 - 可能包含所有平台的硬链接
      './node_modules/.pnpm/**',

      // 所有非 Linux 平台的 swc 编译文件
      './node_modules/@next/swc-win32-x64-msvc/**',
      './node_modules/@next/swc-win32-ia32-msvc/**',
      './node_modules/@next/swc-darwin-x64/**',
      './node_modules/@next/swc-darwin-arm64/**',
      './node_modules/@next/swc-linux-arm64-gnu/**',
      './node_modules/next/dist/compiled/**',

      // recharts 和其他大库 - 使用动态导入，不需打包
      './node_modules/recharts/**',
      './node_modules/d3-scale/**',
      './node_modules/d3-shape/**',
      './node_modules/d3-time/**',
      './node_modules/d3-array/**',

      // 开发文件和文档
      './**/*.map',
      './**/README*',
      './**/CHANGELOG*',
      './**/LICENSE*',
      './**/HISTORY*',
      './**/AGENTS.md',
      './**/CONTRIBUTING.md',
      './**/DEVELOPING.md',
      './**/*.md',

      // 测试文件
      './**/__tests__/**',
      './**/*.test.ts',
      './**/*.test.tsx',
      './**/*.spec.ts',
      './**/jest.config.*',

      // 配置文件
      './**/.eslintrc*',
      './**/.prettierrc*',
      './**/tsconfig*.json',
      './**/.git/**',

      // 其他大文件
      './**/*.hbs',
      './**/templates/**',
    ],
  },

  // 指定在服务器端不需要打包的大型依赖
  serverExternalPackages: [
    'prisma',
    '@prisma/client',
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
      exclude: ['error', 'warn'], // 保留 console.error 和 console.warn
    } : false,
  },
}

export default withBundleAnalyzer(nextConfig)
