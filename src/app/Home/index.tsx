'use client';

import { Icon } from '@iconify-icon/react';

export default function HomeComp() {
  return (
    <div className="flex justify-center items-center my-4 border border-gray-400 w-fit px-2 rounded-md">
      <Icon icon="ph:gear-fill" className="text-xl mr-1" />
      <Icon icon="mdi:github" className="text-xl mr-1" />
      <Icon icon="simple-icons:juejin" className="text-xl mr-1" />
      <Icon icon="mingcute:wechat-line" className="text-xl mr-1" />
        设置
    </div>
  );
}
