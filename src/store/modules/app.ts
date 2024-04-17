/*
 * @Author: dushuai
 * @Date: 2024-04-17 14:49:31
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-17 15:39:32
 * @description: app store
 */
import { create } from "zustand"
import { createJSONStorage, persist, devtools } from 'zustand/middleware'

type Store = {
  token: string
  // ... other state properties
}

type Actions = {
  SET_TOKEN: (token: string) => void
  REMOVE_TOKEN: () => void
  RESET: () => void
  // ... other action creators
}

// define the initial state
const initialState: Store = {
  token: ''
}

export const useAppStore = create<Store & Actions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        SET_TOKEN(token) {
          // set({ token })
          set(state => ({ token }))
        },

        REMOVE_TOKEN() {
          set({ token: '' })
          // set(state => ({ token: '' }))
        },

        RESET() {
          set(initialState)
        }

      }),
      {
        name: 'app-store', // unique name
        storage: createJSONStorage(() => sessionStorage)
      }
    )
  )
)
