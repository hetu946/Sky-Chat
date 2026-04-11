import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  // 排除 Prisma 和 pnpm 相关的二进制文件，减小 Serverless Function 体积
  outputFileTracingExcludes: {
    '*': [
      // Prisma 引擎文件 - 运行时动态加载，不需要打包
      './node_modules/@prisma/engines/**',
      './node_modules/prisma/**',
      './node_modules/.prisma/**',
      './node_modules/@prisma/client/libquery_engine*',
      // 排除 pnpm 虚拟存储目录中的平台无关文件
      './node_modules/.pnpm/**',
      // 排除所有平台的 swc 编译文件（只保留 Linux 版本）
      './node_modules/@next/swc-win32-x64-msvc/**',
      './node_modules/@next/swc-win32-ia32-msvc/**',
      './node_modules/@next/swc-darwin-x64/**',
      './node_modules/@next/swc-darwin-arm64/**',
      './node_modules/@next/swc-linux-x64-gnu/**',
      './node_modules/@next/swc-linux-arm64-gnu/**',
      // 排除开发文件和文档
      './**/*.map',
      './**/README*',
      './**/CHANGELOG*',
      './**/LICENSE*',
      './**/HISTORY*',
      './**/*.md',
      // 测试和配置文件
      './**/__tests__/**',
      './**/*.test.ts',
      './**/*.test.tsx',
      './**/*.spec.ts',
      './**/jest.config.*',
      './**/.eslintrc*',
      './**/.prettierrc*',
      './**/tsconfig*.json',
      './**/.git/**',
    ],
  },

  // 指定在服务器端不需要打包的大型依赖，这些包由 Vercel 运行时提供
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
