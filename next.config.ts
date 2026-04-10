import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  // 排除 Prisma 多余的二进制文件，减小 Serverless Function 体积
  outputFileTracingExcludes: {
    '*': [
      './node_modules/@prisma/engines/**',
      './node_modules/prisma/libquery_engine*',
      './node_modules/@prisma/client/libquery_engine*',
      './node_modules/.pnpm/@prisma+engines*/**/*.node',
    ],
  },

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
