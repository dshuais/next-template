/*
 * @Author: dushuai
 * @Date: 2024-03-29 18:14:56
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-19 17:56:18
 * @description: loading 组件
 */
import styles from '~/asstes/styles/loading.module.css';

export default function Loading() {

  return (
    <div className={styles['loading-two']}>
      <div className={styles['loader-two']} />
    </div>
  );
}
