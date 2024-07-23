/*
 * @Author: dushuai
 * @Date: 2024-04-17 14:49:31
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-18 09:52:57
 * @description: app store
 */
import { StoreKey, TOKEN_KEY } from "@/common"
import { create } from "zustand"
import { createJSONStorage, persist, devtools } from 'zustand/middleware'
import jsCookie from 'js-cookie'

type Store = {
  token: string
  // ... other state properties
}

type Actions = {
  SET_TOKEN: (token: string) => void
  REMOVE_TOKEN: () => void
  RESET: () => void
  SET_STATE: (data: { key: keyof Store, val: Store[keyof Store] }) => void
  // ... other action creators
}

// define the initial state
const initialState = (): Store => ({
  token: ''
})

/**
 * 当前store版本
 * 更改后需要手动修改并添加migrate逻辑
 */
const APP_STORE_VERSION: number = 0.1

export const useAppStore = create<Store & Actions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState(),

        SET_STATE(data: { key: keyof Store, val: Store[keyof Store] }) {
          set({ [data.key]: data.val })
        },

        SET_TOKEN(token) {
          set({ token })
          jsCookie.set(TOKEN_KEY, token)
        },

        REMOVE_TOKEN() {
          set({ token: '' })
          jsCookie.remove(TOKEN_KEY)
        },

        RESET() {
          set(initialState())
          jsCookie.remove(TOKEN_KEY)
        }

      }),
      {
        name: StoreKey.APP, // unique name
        storage: createJSONStorage(() => sessionStorage),
        version: APP_STORE_VERSION, // a migration will be triggered if the version in the storage mismatches this one

        // migration logic
        migrate: (persistedState, version) => {

          const state = initialState()

          if (version != APP_STORE_VERSION) {
            Object.assign(state, persistedState)
          }

          return state
        }
      }
    ),
    { name: StoreKey.APP, enabled: true }
  )
)
