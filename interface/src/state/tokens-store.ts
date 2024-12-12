import "immer";
import { create } from "zustand";
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

export const useBoughtTokensStore = create<
  State & Actions,
  [["zustand/immer", never]]
>(
  immer((set) => ({
    ...initialState,
    addToken: (token: Token) =>
      set((state) => {
        state.tokens.push(token);
      }),
    clearTokens: () => set({ tokens: [] }),
  }))
);
