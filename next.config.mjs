/*
 * @Author: dushuai
 * @Date: 2024-04-15 18:01:11
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-23 17:58:47
 * @description: nextConfig
 */
/** @type {import('next').NextConfig} */

import bundleAnalyzer from '@next/bundle-analyzer'

// 用于分析 Next.js 应用打包后的文件大小（可选）
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
  analyzerMode: 'static'
})

const isProd = process.env.NEXT_PUBLIC_APP_ENV === 'production'
const isDev = process.env.NEXT_PUBLIC_APP_ENV === 'development'

let assetPrefix = '/next'
let distDir = '.next'

if (isProd) {
  assetPrefix = process.env.NEXT_PUBLIC_APP_RESOURCE_URL
  distDir = '.next'
}

const nextConfig = {

  assetPrefix,

  distDir,

  output: 'standalone', // 默认 standalone 表示使用next.js的内嵌式运行时; export 表示生成静态化文件

  compress: true, // gzip

  // 关闭严格模式 可避免页面渲染两次
  // reactStrictMode: false,

  // 启用styledComponents
  compiler: {
    styledComponents: true
  },

  // 配置图片网络资源
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.dshuais.com',
      }
    ]
  },

}

if (isDev) {
  nextConfig.rewrites = rewrites
}

// 代理
async function rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: `${process.env.NEXT_PUBLIC_APP_SERVE_URl}:path*`
    }
  ]
}

export default withBundleAnalyzer(nextConfig);
