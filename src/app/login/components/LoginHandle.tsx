
/*
 * @Author: dushuai
 * @Date: 2024-04-23 14:36:27
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-23 17:48:19
 * @description: login
 */
'use client'

import { useAppStore } from "@/store"
import { message } from "antd"
import { useRouter } from "next/navigation"
import styled from "styled-components"

const ButtonCustom = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  transition: background-color 0.2s linear;
  &:hover {
    background-color: #0056b3;
  }
`

export default function LoginHandle() {

  const SET_TOKEN = useAppStore(state => state.SET_TOKEN)

  const router = useRouter()

  function login() {
    SET_TOKEN('new_token')
    message.success('登陆成功')
    router.replace('/')
  }

  return (
    <div>
      <ButtonCustom onClick={login}>登陆</ButtonCustom>
    </div>
  )
}
