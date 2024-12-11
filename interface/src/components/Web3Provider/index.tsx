import { argent, braavos, StarknetConfig, starkscan, useInjectedConnectors } from '@starknet-react/core'
import { junoRpcProviders, SUPPORTED_STARKNET_NETWORKS } from 'constants/networks'
import { ArgentMobileConnector } from 'starknetkit-next/argentMobile'
import { WebWalletConnector } from 'starknetkit-next/webwallet'

// STARKNET

interface StarknetProviderProps {
  children: React.ReactNode
}

export function StarknetProvider({ children }: StarknetProviderProps) {
  const { connectors: injected } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: 'always',
  })

  const connectors = [
    ...injected,
    new WebWalletConnector({ url: 'https://web.argent.xyz' }),
    new ArgentMobileConnector(),
  ]

  return (
    <StarknetConfig
      connectors={connectors as any}
      chains={SUPPORTED_STARKNET_NETWORKS}
      provider={junoRpcProviders}
      explorer={starkscan}
      autoConnect
    >
      {children}
    </StarknetConfig>
  )
}
