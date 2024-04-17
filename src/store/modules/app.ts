/*
 * @Author: dushuai
 * @Date: 2024-04-17 14:49:31
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-17 17:00:57
 * @description: app store
 */
import { StoreKey } from "@/common"
import { create } from "zustand"
import { createJSONStorage, persist, devtools } from 'zustand/middleware'

type Store = {
  token: string
  a: number
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
  token: '',
  a: 0
})

/**
 * 当前store版本
 * 更改后需要手动修改并天机migrate逻辑
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
          // set({ token })
          set(state => ({ token }))
        },

        REMOVE_TOKEN() {
          set({ token: '' })
          // set(state => ({ token: '' }))
        },

        RESET() {
          set(initialState())
        }

      }),
      {
        name: StoreKey.APP, // unique name
        storage: createJSONStorage(() => sessionStorage),
        version: APP_STORE_VERSION, // a migration will be triggered if the version in the storage mismatches this one

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
