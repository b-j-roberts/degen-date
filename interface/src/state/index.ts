import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { ApplicationSlice, createApplicationSlice } from './application'
import { createTokensSlice, TokensSlice } from './tokens-store'

export type StoreState = ApplicationSlice & TokensSlice

const PERSISTING_KEYS: Array<keyof StoreState> = ['tokens']

export const useBoundStore = create<StoreState>()(
  persist(
    immer<StoreState>((...a) => ({
      ...createApplicationSlice(...a),
      ...createTokensSlice(...a),
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
