/*
 * @Author: dushuai
 * @Date: 2024-04-16 16:03:31
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-16 17:45:00
 * @description: 心平气和
 */
"use client"

import { usePathname, useSearchParams } from "next/navigation"

export default function page() {

  const pathname = usePathname()
  const searchParams = useSearchParams()

  console.log(pathname, searchParams.toString());

  return (
    <div>user about</div>
  )
}
