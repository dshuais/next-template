
/*
* @Author: dushuai
* @Date: 2024-04-18 17:11:16
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-18 17:30:13
* @description: 心平气和
*/
import { useSettings } from "@/store"
import { formatDate } from "@/utils"

export default function UserTest({ children }: { children: React.ReactNode }) {

  const updateTime = useSettings((state) => state.updateTime)
  const { theme, RESET } = useSettings()

  return (
    <>
      <div>UserTest</div>
      <div>updateTime: {formatDate(updateTime)}</div>
      <div>theme: {theme}</div>
      <div onClick={RESET}>reset</div>
      {children}
    </>
  )
}
