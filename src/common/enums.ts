/*
 * @Author: dushuai
 * @Date: 2024-04-17 15:57:21
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-18 15:11:02
 * @description: 枚举文件
 */

export const APP_KEY = 'next-template'

export const TOKEN_KEY = `${APP_KEY}-token`

export enum StoreKey {
  APP = `app-store-${APP_KEY}`,
  SETTINGS = `settings-store-${APP_KEY}`
}
