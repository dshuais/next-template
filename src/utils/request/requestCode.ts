/*
 * @Author: dushuai
 * @Date: 2023-04-03 14:33:53
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-23 12:15:13
 * @description: 统一处理报错
 */
import { message } from 'antd';
import { useAppStore } from '@/store';

/** 不需要token的接口列表 */
const noTokenUrl: string[] = ['app/main/getToken'];
/** 报错需要跳转降级页的状态码 -500 */
const to404Url: number[] = [];

/**
 * 统一处理报错
 * @param {string} url
 * @param {Res.ResponseRes} respnse
 */
export default (url: string, respnse: Res.ResponseRes): void => {
  const { code, msg } = respnse;

  if(code === 200) { // 正常

  } else if(code === 401 && !noTokenUrl.includes(url)) { // 401未登录
    console.log('登陆异常err:>> ', url);
    // 清除token
    useAppStore.getState().REMOVE_TOKEN();
    // window.location.replace('/login')

  } else if(to404Url.includes(code)) { // 跳降级页
    window.location.href = '/404';

  } else {
    message.error(msg);
  }

};
