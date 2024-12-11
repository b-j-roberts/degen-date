import { useAccount } from '@starknet-react/core'
import { SecondaryButton } from 'components/Button'
import { Row } from 'components/Flex'
import WalletConnectModal from 'components/WalletModal/Connect'
import { L2WalletOverviewModal } from 'components/WalletModal/Overview'
import { useL2WalletOverviewModal, useWalletConnectModal } from 'hooks/useModal'
import { shortenL2Address } from 'utils/address'

function Web3StatusContent() {
  const { address: l2Account } = useAccount()

  // modal
  const [, toggleWalletConnectModal] = useWalletConnectModal()
  const [, toggleL2WalletOverviewModal] = useL2WalletOverviewModal()

  if (l2Account) {
    return (
      <Row gap={8}>
        <SecondaryButton onClick={toggleL2WalletOverviewModal}>{shortenL2Address(l2Account)}</SecondaryButton>
      </Row>
    )
  } else {
    return <SecondaryButton onClick={toggleWalletConnectModal}>Connect wallet</SecondaryButton>
  }
}

export default function Web3Status() {
  return (
    <>
      <Web3StatusContent />

      <WalletConnectModal />
      <L2WalletOverviewModal />
    </>
  )
}
