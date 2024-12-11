import Multicall from 'contracts/Multicall.json'
import { json } from 'starknet'

export const MULTICALL_ADDRESS = '0x64c8d452ec94521590795c5402e457a1da1faf92995228d6ac78981abd03c67'

export const compiledMulticall = json.parse(JSON.stringify(Multicall.abi))

// Clicker

export const CLICKER_ADDRESS = '0x521974081f17fc791daaa482942e3aa1e9877797952d42c761ba88ed2b3cbed'
