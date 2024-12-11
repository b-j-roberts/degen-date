import { useBoundStore } from 'state'

export function useConnectWallet(): { connectWallet: () => void } {
  const { connectWallet } = useBoundStore((state) => ({ connectWallet: state.connectWallet }))

  return { connectWallet }
}
