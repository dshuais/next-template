/*
 * @Author: dushuai
 * @Date: 2024-04-23 14:38:24
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-23 15:14:31
 * @description: Home 组件
 */
'use client';

import { useAppStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Icon } from '@iconify-icon/react';
import { Login } from '~/api';
import styled from 'styled-components';

/**
 * css in js
 */
const ButtonDiv = styled.div`
  padding: 10px;
  background-color: red;
  color: white;
  border-radius: 10px;
  transition: background-color 0.2s linear;
  cursor: pointer;
  width: max-content;
  &:hover {
    background-color: blue;
  }
`;

export default function Home() {

  const router = useRouter();

  const handleAbout = () => {
    router.push('/user/about?a=123');
  };

  const token = useAppStore(useShallow(state => state.token));

  const setToken = useAppStore(state => state.SET_TOKEN);

  const appStore = useAppStore();

  useEffect(() => {
    console.log('env', process.env.NEXT_PUBLIC_APP_ENV);
  }, []);

  async function getHttp() {
    // const a = { a: 1, b: 5, c: { d: 6, e: { f: 8 } }, g: 9 }

    // GetCaptcha(a).then(res => {
    //   console.log('res', res, res.code, res.data.captcha);
    // })

    const user = {
      email: '1137896420@qq.com',
      password: '123456'
    };

    const res = await Login(user);
    console.log(res, res.data.loginId);

  }

  return (
    <div className="text-center">
      <div className="flex justify-center items-center my-4 border border-gray-400 w-fit px-2 rounded-md">
        <Icon icon="ph:gear-fill" className="text-xl mr-1" />
        <Icon icon="mdi:github" className="text-xl mr-1" />
        <Icon icon="simple-icons:juejin" className="text-xl mr-1" />
        <Icon icon="mingcute:wechat-line" className="text-xl mr-1" />
        设置
      </div>

      <div onClick={handleAbout}>user-about</div>

      <div onClick={() => setToken('new_token')}>setToken</div>
      <div>token: {token}</div>
      <div onClick={() => appStore.SET_TOKEN('new_tokentokentoken')}>setToken</div>
      <div onClick={() => appStore.SET_STATE({ key: 'token', val: 'new_token2' })}>setToken2</div>
      <div>token: {appStore.token}</div>
      <div onClick={() => appStore.RESET()}>reset</div>

      <ButtonDiv onClick={getHttp}>Button</ButtonDiv>

    </div>
  );
}
