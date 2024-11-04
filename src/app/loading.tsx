/*
 * @Author: dushuai
 * @Date: 2024-03-29 18:14:56
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-19 17:55:46
 * @description: loading 组件
 */
'use client';

import { useMemo, useState } from 'react';
import styles from '~/asstes/styles/loading.module.css';

export default function Loading() {

  const [temp] = useState('two');

  const Component = useMemo(() => {
    return temp === 'one' ? LoadingOne : LoadingTwo;
  }, []);

  return (
    <Component />
  );
}

// 规则循环旋转
function LoadingOne() {
  return (
    <div className={styles.loading}>
      <div className={styles.loader}>
        <div className={styles.circle} />
        <div className={styles.circle} />
        <div className={styles.circle} />
        <div className={styles.circle} />
      </div>
    </div>
  );
}

// 不规则旋转
function LoadingTwo() {
  return (
    <div className={styles['loading-two']}>
      <div className={styles['loader-two']} />
    </div>
  );
}
