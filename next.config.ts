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
      './node_modules/.pnpm/**', // pnpm 依赖存储目录
      // 源代码和开发文件
      './**/*.ts', // 保留 .tsx 和 .js/.mjs 即可
      './**/*.map',
      './**/*.json', // 保留必要的 .json
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
