/*
 * @Author: dushuai
 * @Date: 2024-04-16 11:42:28
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-19 17:57:03
 * @description: notFound 组件
 */
import Link from 'next/link'
import styles from '~/asstes/styles/not-found.module.css'

export default function notFound() {

  const four = `${styles.stamp} ${styles.four} ${styles.div}`

  const zero = `${styles.stamp} ${styles.zero} ${styles.div}`

  function getParentName(name: string) {
    return `${styles[name]} ${styles.div}`
  }

  return (
    <div className={styles.body}>
      <div className={styles.text}>
        <h1 className={styles['text-oops']}>Oops!</h1>
        <p className={styles['text-sorry']}>Sorry, an unexpected error has occurred.</p>
        <div>Page not found!</div>
        <Link href="/" className={styles.btn} >Go Home</Link>
      </div>

      <div className={getParentName('rail')}>
        <div className={four}>4</div>
        <div className={zero}>0</div>
        <div className={four}>4</div>
        <div className={zero}>0</div>
        <div className={four}>4</div>
        <div className={zero}>0</div>
        <div className={four}>4</div>
        <div className={zero}>0</div>
        <div className={four}>4</div>
        <div className={zero}>0</div>
        <div className={four}>4</div>
        <div className={zero}>0</div>
        <div className={four}>4</div>
        <div className={zero}>0</div>
        <div className={four}>4</div>
        <div className={zero}>0</div>
        <div className={four}>4</div>
        <div className={zero}>0</div>
        <div className={four}>4</div>
        <div className={zero}>0</div>
      </div>
      <div className={getParentName('world')}>
        <div className={getParentName('forward')}>
          <div className={getParentName('box')}>
            <div className={getParentName('wall')}></div>
            <div className={getParentName('wall')}></div>
            <div className={getParentName('wall')}></div>
            <div className={getParentName('wall')}></div>
            <div className={getParentName('wall')}></div>
            <div className={getParentName('wall')}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
