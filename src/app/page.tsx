/*
 * @Author: dushuai
 * @Date: 2024-04-15 17:10:01
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-23 14:50:02
 * @description: page
 */
import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'antd';
import { Icon } from '@iconify-icon/react';

import Img10 from '~/asstes/images/img_10.png';

export default function Home() {

  return (
    <main className="">

      <div className="flex justify-center items-center my-4 border border-gray-400 w-fit px-2 rounded-md">
        <Icon icon="ph:gear-fill" className="text-xl mr-1" />
        <Icon icon="mdi:github" className="text-xl mr-1" />
        <Icon icon="simple-icons:juejin" className="text-xl mr-1" />
        <Icon icon="mingcute:wechat-line" className="text-xl mr-1" />
        设置
      </div>

      <div className="w-12 h-12 bg-red-500" />

      <Button type="dashed">
        <Link href={'/user'}>user</Link>
      </Button>

      <Button type="primary">Button</Button>

      <Image src={Img10} alt="本地图片" width={100} height={200} priority />

      <Image src="/images/d.png" alt="本地图片" width={100} height={200} priority />

    </main>
  );
}
