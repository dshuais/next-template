/*
 * @Author: dushuai
 * @Date: 2024-04-19 16:29:03
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-21 12:55:42
 * @description: 封装request
 */

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

/**
 * 封装request fetch
 */
class NextRequest {

  /**
   * 请求拦截
   */
  interceptorsRequest({ url, method, params, cacheTime, headers }: Props) {
    let queryParams = '' // url参数
    let requestPayload = {} // 请求体

    return { url, options: {} }
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
