import "immer";
import { StoreState } from "state";
import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Token = {
  name: string;
  ticker: string;
  imageUrl: string;
  marketCap: number;
  holders: number;
};

type State = {
  tokens: Token[];
};

type Actions = {
  addToken: (token: Token) => void;
  clearTokens: () => void;
};

const initialState: State = {
  tokens: [],
};

export type TokensSlice = State & Actions;

export const useBoughtTokensStore: StateCreator<
  StoreState,
  [["zustand/immer", never]],
  [],
  TokensSlice
> = (set) => ({
  ...initialState,
  addToken: (token: Token) =>
    set((state) => {
      state.tokens.push(token);
    }),
  clearTokens: () => set({ tokens: [] }),
});
