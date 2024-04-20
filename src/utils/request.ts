/*
 * @Author: dushuai
 * @Date: 2024-04-19 16:29:03
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-20 13:07:40
 * @description: 封装request
 */

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

/**
 * 封装request fetch
 */
class NextRequest {

  /**
   * 请求拦截
   */
  interceptorsRequest() {

  }

  /**
   * 响应拦截
   */
  interceptorsResponse() {

  }

}

/**
 * 自定义fetch
 */
const request = new NextRequest()

export default request
