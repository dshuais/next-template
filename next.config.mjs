/*
 * @Author: dushuai
 * @Date: 2024-04-15 18:01:11
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-19 12:19:58
 * @description: nextConfig
 */
/** @type {import('next').NextConfig} */
const nextConfig = {

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
  }

};

export default nextConfig;
