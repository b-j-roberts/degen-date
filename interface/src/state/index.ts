import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { AccountSlice, createAccountSlice } from './account'
import { ApplicationSlice, createApplicationSlice } from './application'

export type StoreState = AccountSlice & ApplicationSlice

export const useBoundStore = create<StoreState>()(
  immer<StoreState>((...a) => ({
    ...createAccountSlice(...a),
    ...createApplicationSlice(...a),
  }))
)
