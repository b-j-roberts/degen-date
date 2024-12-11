import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { ApplicationSlice, createApplicationSlice } from './application'

export type StoreState = ApplicationSlice

export const useBoundStore = create<StoreState>()(
  immer<StoreState>((...a) => ({
    ...createApplicationSlice(...a),
  }))
)
