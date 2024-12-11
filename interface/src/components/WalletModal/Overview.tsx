import { SecondaryButton } from 'components/Button'
import Portal from 'components/common/Portal'
import Content from 'components/Modal/Content'
import Overlay from 'components/Modal/Overlay'
import { useCloseModal, useL2WalletOverviewModal } from 'hooks/useModal'
import { useCallback } from 'react'

interface WalletOverviewModalProps {
  chainLabel?: string
  disconnect: () => void
}

function WalletOverviewModal({ chainLabel, disconnect }: WalletOverviewModalProps) {
  // modal
  const close = useCloseModal()

  // disconnect
  const disconnectAndClose = useCallback(() => {
    disconnect()
    close()
  }, [disconnect, close])

  return (
    <Portal>
      <Content title={`${chainLabel} wallet`} close={close}>
        <SecondaryButton onClick={disconnectAndClose}>Disconnect</SecondaryButton>
      </Content>

      <Overlay onClick={close} />
    </Portal>
  )
}

export function L2WalletOverviewModal() {
  // modal
  const [isOpen] = useL2WalletOverviewModal()

  // disconnect
  // TODO: const { disconnect } = useDisconnect()
  const disconnect = () => console.log('TODO: disconnect')

  // chain infos
  // TODO: const { chain } = useNetwork()
  const chain = { name: 'TODO: Sepolia' }

  if (!isOpen) return null

  return <WalletOverviewModal chainLabel={chain?.name} disconnect={disconnect} />
}
