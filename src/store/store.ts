/*
 * @Author: dushuai
 * @Date: 2024-04-18 12:28:06
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-28 16:44:16
 * @description: 创建自定义store
 */
import { create, StoreApi, UseBoundStore } from 'zustand';
import { PersistOptions, combine, devtools, persist } from 'zustand/middleware';

import { StoreKey } from '@/common';

type SetStoreState<T> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>),
  replace?: boolean | undefined
) => void

export type STATE<T> = { key: keyof T, val: T[keyof T] }

export type MakeState = {
  updateTime: number,
}

export type MakeUpdater<T> = {
  SET_STATE: (data: STATE<T>) => void
  SET_UPDATE_TIME: () => void
  RESET: () => void
}

type Store<S extends StoreApi<unknown>> = UseBoundStore<S>

export type Methods<T, M> = (set: SetStoreState<T>, get: () => M & T & MakeUpdater<T>, store: Store<any>) => M

/**
 * 创建store
 * @param name store名称
 * @param state state
 * @param methods actions
 * @param persistOptions 持久化配置
 */
export function createCustomStore<T extends object, M>(
  name: StoreKey,
  state: T,
  methods: Methods<T & MakeState, M>,
  persistOptions: PersistOptions<T & MakeState>
) {

  const initialState: MakeState = {
    updateTime: 0
  };

  const newStore = Object.assign(initialState, state);

  type State = T & MakeState

  type Get = () => State & MakeUpdater<State> & M

  type Set = Partial<MakeState & T>

  type Update =
  | State
  | Partial<State>
  | ((state: State) => State | Partial<State>);

  return create(devtools(
    persist(
      combine(
        newStore,

        (set, get, store) => ({
          ...methods(set, get as Get, store),

          /**
             * 一个通用set的方法 可用于偷懒
             * @param data
             */
          SET_STATE: (data: Update) => {
            set(data);
          },

          /**
             * 重置整个store
             */
          RESET() {
            set(newStore);
          },

          /**
             * 更新时间
             */
          SET_UPDATE_TIME() {
            set(() => ({ updateTime: Date.now() }) as Set);
          }
        })
      ),
        persistOptions as any
    ),
    { name, enabled: true }
  ));
}
