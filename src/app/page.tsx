/*
 * @Author: dushuai
 * @Date: 2024-04-15 17:10:01
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-17 11:11:09
 * @description: page
 */
"use client"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Icon } from '@iconify-icon/react'

export default function Home() {

  const router = useRouter()

  const handleAbout = () => {
    router.push('/user/about?a=123')
  }

  useEffect(() => {
    console.log('env', process.env.NEXT_PUBLIC_APP_ENV);
  })


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-red-50">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
      </div>

      <div className='flex justify-center items-center my-4 border border-gray-400 w-fit px-2 rounded-md'>
        <Icon icon="ph:gear-fill" className="text-xl mr-1" />
        <Icon icon="mdi:github" className="text-xl mr-1" />
        <Icon icon="simple-icons:juejin" className="text-xl mr-1" />
        <Icon icon="mingcute:wechat-line" className="text-xl mr-1" />
        设置
      </div>

      <Link href={'/user'}>user</Link>

      <div onClick={handleAbout}>user-about</div>

    </main>
  )
}
