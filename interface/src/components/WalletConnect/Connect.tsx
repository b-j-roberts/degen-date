import { useAccount } from '@starknet-react/core'
import { Column, Row } from 'components/Flex'
import { getL2Connections } from 'connections'
import { useConnectWallet } from 'hooks/useAccount'
import { useWalletConnectModal } from 'hooks/useModal'
import { useEffect } from 'react'
import { styled } from 'styled-components'
import { ThemedText } from 'theme/components'

const StyledWalletConnect = styled(Row)`
  position: absolute;
  top: 0;
  left: 24px;
  right: 24px;
  bottom: 0;
`

const OptionsContainer = styled(Column)`
  gap: 16px;
  width: 100%;
  align-items: flex-start;
`

const StyledConnectButton = styled(Row)`
  padding: 8px;
  cursor: pointer;
  position: relative;
  width: 100%;
  border: 3px solid transparent;
  background: ${({ theme }) => theme.surface2};
  border-radius: 8px;
  padding: 8px 16px;
`

export default function WalletConnect() {
  // accounts
  const { address: l2Account } = useAccount()

  // connections
  const l2Connections = getL2Connections()

  // modal
  const [, toggle] = useWalletConnectModal()

  // close modal if both layers have a connected wallet
  useEffect(() => {
    if (l2Account) {
      toggle()
    }
  }, [toggle, l2Account])

  const { connectWallet } = useConnectWallet()
  const activate = () => connectWallet()

  return (
    <StyledWalletConnect>
      <OptionsContainer>
        <StyledConnectButton gap={16} onClick={activate}>
          <ThemedText.BodyPrimary>Connect Wallet</ThemedText.BodyPrimary>
        </StyledConnectButton>
      </OptionsContainer>
    </StyledWalletConnect>
  )
}
