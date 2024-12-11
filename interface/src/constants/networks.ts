import { Chain, sepolia } from '@starknet-react/chains'
import { ChainProviderFactory } from '@starknet-react/core'
import { RpcProvider } from 'starknet'

export const SUPPORTED_STARKNET_NETWORKS = [sepolia]

const JUNO_KEY = process.env.REACT_APP_JUNO_KEY as string
if (typeof JUNO_KEY === 'undefined') {
  throw new Error(`REACT_APP_JUNO_KEY must be a defined environment variable`)
}

const DEFAULT_NETWORK_NAME = process.env.REACT_APP_DEFAULT_NETWORK_NAME as string
if (typeof DEFAULT_NETWORK_NAME === 'undefined') {
  throw new Error(`REACT_APP_DEFAULT_NETWORK_NAME must be a defined environment variable`)
} else if (SUPPORTED_STARKNET_NETWORKS.every(({ network }) => network !== DEFAULT_NETWORK_NAME)) {
  throw new Error(`REACT_APP_DEFAULT_NETWORK_NAME is invalid`)
}

export const junoRpcProviders: ChainProviderFactory = (chain: Chain) => {
  switch (chain.id) {
    case sepolia.id:
      return new RpcProvider({
        nodeUrl: `https://rpc.nethermind.io/sepolia-juno/?apikey=${JUNO_KEY}`,
      })

    default:
      return null
  }
}
