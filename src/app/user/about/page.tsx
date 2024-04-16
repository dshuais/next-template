/*
 * @Author: dushuai
 * @Date: 2024-04-16 16:03:31
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-16 18:39:04
 * @description: 心平气和
 */
"use client"

import { usePathname, useSearchParams } from "next/navigation"

export default function UserAbout() {

  const pathname = usePathname()
  const searchParams = useSearchParams()

  console.log(pathname, searchParams.toString());

  return (
    <div>user about</div>
  )
}
