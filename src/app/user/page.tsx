
/*
 * @Author: dushuai
 * @Date: 2024-04-16 14:41:04
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-16 16:32:59
 * @description: 心平气和
 */
import Link from "next/link";

export default function User() {
  return (
    <div>
      user index

      <Link href="/user/about">about</Link>

      <Link href="/user/users">users</Link>
    </div>
  )
}
