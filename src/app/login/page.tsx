/*
 * @Author: dushuai
 * @Date: 2024-04-19 10:58:39
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-23 17:49:12
 * @description: Login
 */
import { cookies } from 'next/headers'
import LoginHandle from "./components/LoginHandle";

export default function Login() {

  function setToken() {
    cookies().set('app-token', 'new_token')
  }

  return (
    <div>
      login
      <LoginHandle />
    </div>
  )
}
