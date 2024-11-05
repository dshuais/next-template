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

import HomeComp from './Home';
import Img10 from '~/asstes/images/img_10.png';

export default function Home() {

  return (
    <main className="">

      <HomeComp />

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
