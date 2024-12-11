import { useAccount } from '@starknet-react/core'
import Portal from 'components/common/Portal'
import { Column } from 'components/Flex'
import Content from 'components/Modal/Content'
import Overlay from 'components/Modal/Overlay'
import { getL2Connections } from 'connections'
import { useWalletConnectModal } from 'hooks/useModal'
import { useEffect } from 'react'
import { styled } from 'styled-components'

import { L2Option } from './Option'

const OptionsContainer = styled(Column)`
  gap: 8px;
  width: 100%;
  align-items: flex-start;
`

function WalletConnectContent() {
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

  return (
    <Content title="Connect Starknet wallet" close={toggle}>
      <OptionsContainer>
        {l2Connections
          .filter((connection) => connection.shouldDisplay())
          .map((connection) => (
            <L2Option key={connection.getName()} connection={connection} />
          ))}
      </OptionsContainer>
    </Content>
  )
}

export default function WalletConnectModal() {
  // modal
  const [isOpen, toggle] = useWalletConnectModal()

  if (!isOpen) return null

  return (
    <Portal>
      <WalletConnectContent />

      <Overlay onClick={toggle} />
    </Portal>
  )
}
