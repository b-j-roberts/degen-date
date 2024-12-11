import { atom } from 'jotai'

export const formFieldsAtom = atom<{
  name: string
  ticker: string
  picture: FileReader['result'] | null
}>({
  name: '',
  ticker: '',
  picture: null,
})
