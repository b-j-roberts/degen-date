import { useBoundStore } from 'state'

export function useIsConnected(): { isConnected: () => boolean } {
  const { isConnected } = useBoundStore((state) => ({ isConnected: state.isConnected }))

  return { isConnected }
}

export function useConnectWallet(): { connectWallet: () => void } {
  const { connectWallet } = useBoundStore((state) => ({ connectWallet: state.connectWallet }))

  return { connectWallet }
}

export function useStartSession(): { startSession: () => void } {
  const { startSession } = useBoundStore((state) => ({ startSession: state.startSession }))

  return { startSession }
}
