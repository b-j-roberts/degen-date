import { junoRpcProviders, SUPPORTED_STARKNET_NETWORKS } from 'constants/networks'
import { ArgentMobileConnector } from 'starknetkit/argentMobile'
import { WebWalletConnector } from 'starknetkit/webwallet'

// STARKNET

interface StarknetProviderProps {
  children: React.ReactNode
}

export function StarknetProvider({ children }: StarknetProviderProps) {
  // TODO
  // const { connectors: injected } = useInjectedConnectors({
  //   recommended: [argent(), braavos()],
  //   includeRecommended: 'always',
  // })

  const connectors = [
    //TODO ...injected,
    new WebWalletConnector({ url: 'https://web.argent.xyz' }),
    new ArgentMobileConnector(),
  ]

  return (
    <StarknetConfig
      connectors={connectors}
      chains={SUPPORTED_STARKNET_NETWORKS}
      provider={junoRpcProviders}
      explorer={starkscan}
      autoConnect
    >
      {children}
    </StarknetConfig>
  )
}
