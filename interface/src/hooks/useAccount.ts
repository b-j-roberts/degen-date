import { useBoundStore } from 'state'

export function useIsConnected(): { isConnected: () => boolean } {
  const { isConnected } = useBoundStore((state) => ({ isConnected: state.isConnected }))

  return { isConnected }
}

export function useAccount(): { account: any } {
  const { account } = useBoundStore((state) => ({ account: state.account }))
  return account
}
