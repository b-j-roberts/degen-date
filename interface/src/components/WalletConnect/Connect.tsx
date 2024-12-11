import { Column, Row } from 'components/Flex'
import { getL2Connections } from 'connections'
import { useAccount } from 'hooks/useAccount'
import { useWalletConnectModal } from 'hooks/useModal'
import { useEffect } from 'react'
import { styled } from 'styled-components'

import { L2Option } from './Option'

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

export default function WalletConnect() {
  // connections
  const { account: l2Account } = useAccount()
  const l2Connections = getL2Connections()

  // modal
  const [, toggle] = useWalletConnectModal()

  // close modal if both layers have a connected wallet
  useEffect(() => {
    if (l2Account) {
      toggle()
    }
  }, [toggle, l2Account])

  return (
    <StyledWalletConnect>
      <OptionsContainer>
        {l2Connections
          .filter((connection) => connection.shouldDisplay())
          .map((connection) => (
            <L2Option key={connection.getName()} connection={connection} />
          ))}
      </OptionsContainer>
    </StyledWalletConnect>
  )
}
