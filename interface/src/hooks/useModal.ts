import { useCallback } from 'react'
import { useBoundStore } from 'state'
import { ModalType } from 'state/application'

function useModal(modal: ModalType): [boolean, () => void] {
  const { toggleModal, isModalOpened } = useBoundStore((state) => ({
    toggleModal: state.toggleModal,
    isModalOpened: state.isModalOpened,
  }))

  const isOpen = isModalOpened(modal)
  const toggle = useCallback(() => toggleModal(modal), [modal, toggleModal])

  return [isOpen, toggle]
}

export const useWalletConnectModal = () => useModal(ModalType.WALLET_CONNECT)
