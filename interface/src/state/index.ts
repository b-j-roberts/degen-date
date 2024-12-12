import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { ApplicationSlice, createApplicationSlice } from './application'
import { TokensSlice, useBoughtTokensStore } from './tokens-store'
import { persist } from 'zustand/middleware'



export type StoreState = TokensSlice & ApplicationSlice

const PERSISTING_KEYS: Array<keyof StoreState> = ['tokens']

export const useBoundStore = create<StoreState>()(
  persist(
    immer<StoreState>((...a) => ({
      ...useBoughtTokensStore(...a),
      ...createApplicationSlice(...a)
    })),
    {
      name: 'rules-state-storage',
      partialize: (state: StoreState) =>
        PERSISTING_KEYS.reduce<StoreState>((acc, key) => {
          ;(acc as any)[key] = state[key]
          return acc
        }, {} as StoreState),
    }
  )
)
