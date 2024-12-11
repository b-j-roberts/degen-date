import { atom } from 'jotai'

import { FieldName } from './utils'

export const formFieldsAtom = atom<Record<FieldName, string>>({
  name: '',
  ticker: '',
  picture: '',
})
