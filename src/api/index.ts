/*
 * @Author: dushuai
 * @Date: 2024-04-23 10:34:48
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-23 14:11:45
 * @description: api
 */
import request from '@/utils/request'

type defaultParams = Record<string, any> | undefined

/**
 * test
 */

export const GetCaptcha = (params: defaultParams) => request.get<{ captcha: string }>('user/logout', params)

export const Login = (params: defaultParams) => request.post<{ tokenValue: string, loginId: string }>('user/login', params)
