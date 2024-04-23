/*
 * @Author: dushuai
 * @Date: 2024-04-19 16:29:03
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-23 12:17:15
 * @description: 封装request
 */
import qs from 'qs'
import { useAppStore } from "@/store"
import ErrorCodeHandle from './requestCode'
import { message } from 'antd'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

type Params = {
  params?: Record<string, any>
  cacheTime?: number // 缓存时间，单位为s。默认强缓存，0为不缓存
}

type Props = {
  url: string
  method: Method
  headers?: Headers | Record<string, any>
} & Params

type Config = { next: { revalidate: number } } | { cache: 'no-store' } | { cache: 'force-cache' }

/** 
 * 不需要处理异常白名单
 */
const whiteList: string[] = ['/qiniu/upload/uptoken']

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
    let headers: Record<string, any> = { // 请求头
      ...header,
      Accept: 'application/json, text/plain, */*'
    }
    let config: Config = { // 缓存配置
      cache: 'force-cache'
    }

    // 添加token
    // const token = useAppStore(state => state.token)
    const token = useAppStore.getState().token

    if (token) {
      headers['token'] = token
    }

    // 处理请求缓存
    if (cacheTime) {
      config = cacheTime === 0 ? { cache: 'no-store' } : { next: { revalidate: cacheTime } }
    }

    const queryList = ['GET', 'DELETE']
    // 处理url参数
    if (queryList.includes(method)) {
      // fetch对GET请求等，不支持将参数传在body上，只能拼接url
      queryParams = qs.stringify(params!)
      url += queryParams ? `?${queryParams}` : ''
    } else {
      // 非form-data传输JSON数据格式
      const type = Object.prototype.toString.call(params!)
      if (!['[object FormData]', '[object URLSearchParams]'].includes(type)) {
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
  interceptorsResponse<T>(res: Response): Promise<Res.ResponseRes<T>> {
    return new Promise(async (resolve, reject) => {
      const reqUrl = res.url

      if (res.ok) {
        const response = await res.json()

        if (response.code === 200) {
          return resolve(response)
        } else {
          /**
           * 处理错误响应
           */
          const url = reqUrl.split(process.env.NEXT_PUBLIC_APP_BASE_URL)[1].split('?')[0]

          if (whiteList.some(e => e.match(url))) {
            console.log('接口通过白名单，不需要异常处理url:>> ', url)
          } else {
            ErrorCodeHandle(url, response)
          }

          return Promise.reject(response)
        }

      } else {
        res.clone().text().then(text => {
          try {
            const err = JSON.parse(text)
            message.error(err || '请求失败')
            return reject({ msg: err || '请求失败', reqUrl })

          } catch (error) {
            message.error(text || '请求失败')
            return reject({ msg: text || '请求失败', reqUrl })

          }
        })
      }
    })
  }

  /**
   * 处理请求
   * @param Props 
   * @returns 
   */
  async request<T>({ url = '', method, params = {}, headers }: Props): Promise<Res.ResponseRes<T>> {
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

  /**
   * get
   * @param url 
   * @param params 
   * @param cacheTime 缓存时间，单位为s。默认强缓存，0为不缓存
   * @returns Promise<T>
   */
  get<T>(url: string, params: Record<string, any> = {}, cacheTime?: number): Promise<Res.ResponseRes<T>> {
    return this.request<T>({
      url,
      method: 'GET',
      params: { params, cacheTime }
    })
  }

  /**
   * post 表单格式
   * @param url 
   * @param params 
   * @param cacheTime 缓存时间，单位为s。默认强缓存，0为不缓存
   * @returns Promise<T>
   */
  post<T>(url: string, params: Record<string, any> = {}, cacheTime?: number): Promise<Res.ResponseRes<T>> {
    return this.request<T>({
      url,
      method: 'POST',
      params: { params: qs.stringify(params), cacheTime },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
    })
  }

  /**
   * post json格式
   * @param url 
   * @param params 
   * @param cacheTime 缓存时间，单位为s。默认强缓存，0为不缓存
   * @returns Promise<T>
   */
  postJson<T>(url: string, params: Record<string, any> = {}, cacheTime?: number): Promise<Res.ResponseRes<T>> {
    return this.request<T>({
      url,
      method: 'POST',
      params: { params, cacheTime }
    })
  }

  /**
   * put
   * @param url 
   * @param params 
   * @param cacheTime 缓存时间，单位为s。默认强缓存，0为不缓存
   * @returns Promise<T>
   */
  put<T>(url: string, params: Record<string, any> = {}, cacheTime?: number): Promise<Res.ResponseRes<T>> {
    return this.request<T>({
      url,
      method: 'PUT',
      params: { params, cacheTime }
    })
  }

  /**
   * delete
   * @param url 
   * @param params 
   * @param cacheTime 缓存时间，单位为s。默认强缓存，0为不缓存
   * @returns Promise<T>
   */
  delete<T>(url: string, params: Record<string, any> = {}, cacheTime?: number): Promise<Res.ResponseRes<T>> {
    return this.request<T>({
      url,
      method: 'DELETE',
      params: { params, cacheTime }
    })
  }

  /**
   * patch
   * @param url 
   * @param params 
   * @param cacheTime 缓存时间，单位为s。默认强缓存，0为不缓存
   * @returns Promise<T>
   */
  patch<T>(url: string, params: Record<string, any> = {}, cacheTime?: number): Promise<Res.ResponseRes<T>> {
    return this.request<T>({
      url,
      method: 'PATCH',
      params: { params, cacheTime }
    })
  }


}

/**
 * 导出fetch
 */
const request = new NextRequest()

export default request

export { NextRequest }
