/*
 * @Author: dushuai
 * @Date: 2024-04-19 16:29:03
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-21 13:53:56
 * @description: 封装request
 */
import queryString from 'query-string'
import { useAppStore } from "@/store"

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

type Params = {
  params?: Record<string, any>
  cacheTime?: number // 缓存时间，单位为s。默认强缓存，0为不缓存
}

type Props = {
  url: string
  method: Method
  headers?: Headers
} & Params

type Config = { next: { revalidate: number } } | { cache: 'no-store' } | { cache: 'force-cache' }

/**
 * 封装request fetch
 */
class NextRequest {

  /**
   * 请求拦截
   */
  interceptorsRequest({ url, method, params, cacheTime, headers: header }: Props) {
    let queryParams = '' // url参数
    let requestPayload = '' // 请求体
    let headers:Record<string, any> = { // 请求头
      ...header
    }
    let config:Config = { // 缓存配置
      cache: 'force-cache'
    }

    // 添加token
    const token = useAppStore(state => state.token)
    if(token) {
      headers['token'] = token
    }

    // 处理请求缓存
    if(cacheTime) {
      config = cacheTime === 0 ? { cache: 'no-store' } : { next: { revalidate: cacheTime } }
    }

    const queryList = ['GET', 'DELETE']
    // 处理url参数
    if(queryList.includes(method)) {
      // fetch对GET请求等，不支持将参数传在body上，只能拼接url
      queryParams = queryString.stringify(params!)
      url += queryParams ? `?${queryParams}` : ''
    } else {
      // 非form-data传输JSON数据格式
      const type = Object.prototype.toString.call(params!)
      if(!['[object FormData]', '[object URLSearchParams]'].includes(type)) {
        headers['Content-Type'] = 'application/json'
        requestPayload = JSON.stringify(params!)
      }
    }

    return {
      url,
      options: {
        method,
        headers,
        body: queryList.includes(method) ? undefined : requestPayload,
        ...config
      }
    }
  }

  /**
   * 响应拦截
   */
  interceptorsResponse<T>(res: Response): Promise<T> {
    return new Promise((resolve, reject) => {

    })
  }

  /**
   * 处理请求
   * @param Props 
   * @returns 
   */
  async request<T>({ url = '', method, params = {}, headers }: Props): Promise<T> {
    const req = this.interceptorsRequest({
      url: process.env.NEXT_PUBLIC_APP_BASE_URL + url,
      method,
      params: params.params,
      cacheTime: params.cacheTime,
      headers
    })
    const res = await fetch(req.url, req.options)
    return this.interceptorsResponse<T>(res)
  }

}

/**
 * 自定义fetch
 */
const request = new NextRequest()

export default request
