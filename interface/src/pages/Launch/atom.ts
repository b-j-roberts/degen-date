import { atom } from 'jotai'

export const INITIAL_FORM_FIELDS_STATE = {
  name: '',
  ticker: '',
  picture: null,
} as const

export const formFieldsAtom = atom<{
  name: string
  ticker: string
  picture: FileReader['result'] | null
}>(INITIAL_FORM_FIELDS_STATE)
