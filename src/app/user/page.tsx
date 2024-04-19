
/*
 * @Author: dushuai
 * @Date: 2024-04-16 14:41:04
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-19 17:47:45
 * @description: test
 */
"use client"

// import UserTest from "@/components/User/UserTest";
import { useSettings } from "@/store";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Spin } from 'antd'

// 动态加载组件
const UserTest = dynamic(() => import('~/components/User/UserTest'),
  {
    loading: () => <Spin /> // <div>Loading...</div>
  }
)

export default function User() {

  const { theme, SET_THEME, SET_STATE, RESET, ...settings } = useSettings()

  return (
    <div>
      user index

      <div>settings: {theme}</div>
      <div onClick={() => SET_THEME('light')}>set Theme</div>
      <div onClick={() => SET_STATE({ key: 'theme', val: 'dark' })}>set state</div>

      <div>{settings.updateTime}</div>
      <div onClick={() => SET_STATE({ key: 'updateTime', val: new Date().getTime() })}>set updateTime</div>
      <div onClick={() => settings.SET_UPDATE_TIME()}>set updateTime222222222222</div>

      <div onClick={() => RESET()}>reset</div>

      <Link href="/user/about">about</Link>

      <Link href="/user/users">users</Link>

      <UserTest>
        <div>user test slot</div>
      </UserTest>
    </div>
  )
}
