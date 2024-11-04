/*
 * @Author: dushuai
 * @Date: 2024-04-15 17:10:01
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-19 10:52:39
 * @description: layout
 */
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import NavigationEvents from '@/components/NavigationEvents';
import StyledComponentsRegistry from '@/lib/registry';
import Loading from './loading';
import '../asstes/styles/globals.css';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_TITLE,
  description: 'Generated by create next app'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en">
      <body>
        {/* 避免antd首屏没有样式 */}
        <AntdRegistry>
          {/* 避免styled-components首屏没有样式 */}
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </AntdRegistry>

        <Suspense fallback={<Loading />}>
          <NavigationEvents />
        </Suspense>
      </body>
    </html>
  );
}
