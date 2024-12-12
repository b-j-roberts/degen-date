import immer from 'immer'
import { StoreState } from 'state'
import { StateCreator } from 'zustand'

type Token = {
  name: string
  ticker: string
  balance: number
  conversion: number
}

type State = {
  tokens: Token[]
}

type Actions = {
  addToken: (token: Token) => void
  clearTokens: () => void
}

const initialState: State = {
  tokens: [
    {
      name: 'Starknet Brother',
      ticker: 'BROTHER',
      balance: 120.0,
      conversion: 0.123,
    },
    {
      name: 'Safe Token 100',
      ticker: 'SAFE',
      balance: 42000.0,
      conversion: 0.01,
    },
    {
      name: 'CatsCatsCats',
      ticker: 'CATS',
      balance: 100000.0,
      conversion: 0.00001,
    },
    {
      name: 'To The Moon',
      ticker:'TTM',
      balance: 10000000000,
      conversion: 0.0004,
    },
  ],
}

export type TokensSlice = State & Actions

export const createTokensSlice: StateCreator<
  StoreState,
  [['zustand/immer', never]],
  [],
  TokensSlice
> = immer((set) => ({
  ...initialState,
  addToken: (token: Token) =>
    set((state: any) => {
      state.tokens.push(token);
    }),
  clearTokens: () => set({ tokens: [] }),
}));