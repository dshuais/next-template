/*
 * @Author: dushuai
 * @Date: 2023-03-20 09:33:25
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-19 10:24:31
 * @description: ts类型文件
 */

interface Window {
  mozRequestAnimationFrame: Function,

  webkitRequestAnimationFrame: Function,

  msRequestAnimationFrame: Function,

  mozCancelAnimationFrame: Function
}

/**
 * App内数据类型
 */
declare namespace App {


}

/**
 * 配置文件类型
 */
declare namespace NodeJS {
  interface ProcessEnv {
    // 本地环境
    NEXT_PUBLIC_NOOD_ENV: string

    // 打包环境
    NEXT_PUBLIC_APP_ENV: string

    // 生产资源路径
    NEXT_PUBLIC_APP_RESOURCE_URL: string

    // 生产请求接口路径
    NEXT_PUBLIC_APP_BASE_URL: string

    // H5标题
    NEXT_PUBLIC_APP_TITLE: string

    // APPKEY
    NEXT_PUBLIC_APP_KEY: string
  }
}
