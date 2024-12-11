import { buildSessionAccount, createSessionRequest, openSession } from '@argent/x-sessions'
import Portal from 'components/common/Portal'
import { Column } from 'components/Flex'
import Content from 'components/Modal/Content'
import Overlay from 'components/Modal/Overlay'
import { getL2Connections } from 'connections'
import { useWalletConnectModal } from 'hooks/useModal'
import { useEffect, useState } from 'react'
import { constants, ec, RpcProvider, stark } from 'starknet'
import { styled } from 'styled-components'

import { L2Option } from './Option'

const OptionsContainer = styled(Column)`
  gap: 8px;
  width: 100%;
  align-items: flex-start;
`

function WalletConnectContent() {
  // accounts
  const { address: l2Account } = { address: '0xTODO' }

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

  const allowedMethods: any = [
    {
      'Contract Address': process.env.REACT_APP_USERNAME_STORE_CONTRACT_ADDRESS,
      selector: 'claim_username',
    },
  ]

  const expiry: any = Math.floor((Date.now() + 1000 * 60 * 60 * 24) / 1000)
  const ETHTokenAddress = '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'
  const parseUnits = (value: any, decimals: any) => {
    let [integer, fraction = ''] = value.split('.')

    const negative = integer.startsWith('-')
    if (negative) {
      integer = integer.slice(1)
    }

    // If the fraction is longer than allowed, round it off
    if (fraction.length > decimals) {
      const unitIndex = decimals
      const unit = Number(fraction[unitIndex])

      if (unit >= 5) {
        /* global BigInt */
        const fractionBigInt = BigInt(fraction.slice(0, decimals)) + BigInt(1)
        fraction = fractionBigInt.toString().padStart(decimals, '0')
      } else {
        fraction = fraction.slice(0, decimals)
      }
    } else {
      fraction = fraction.padEnd(decimals, '0')
    }

    const parsedValue = BigInt(`${negative ? '-' : ''}${integer}${fraction}`)

    return {
      value: parsedValue,
      decimals,
    }
  }

  const ETHFees =
    process.env.REACT_APP_CHAIN_ID === constants.NetworkName.SN_MAIN
      ? [
          {
            tokenAddress: ETHTokenAddress,
            maxAmount: parseUnits('0.001', 18).value.toString(),
          },
        ]
      : [
          {
            tokenAddress: ETHTokenAddress,
            maxAmount: parseUnits('0.1', 18).value.toString(),
          },
        ]

  const metaData = (isStarkFeeToken: boolean) => ({
    projectID: 'degen-date',
    txFees: isStarkFeeToken ? [] : ETHFees,
  })

  const privateKey = ec.starkCurve.utils.randomPrivateKey()
  const dappKey = {
    privateKey,
    publicKey: ec.starkCurve.getStarkKey(privateKey),
  }

  const provider = new RpcProvider({
    nodeUrl: 'https://starknet-sepolia.public.blastapi.io/rpc/v0_7',
    chainId: constants.StarknetChainId.SN_SEPOLIA,
  })

  const wallet: any = 'TODO'
  const sessionParams = {
    allowedMethods,
    expiry,
    metaData: metaData(false),
    publicDappKey: dappKey.publicKey,
  }
  const connectorData: any = 'TODO'
  const startSession = async () => {
    const sessionParams = {
      allowedMethods,
      expiry,
      metaData: metaData(false),
      publicDappKey: dappKey.publicKey,
    }
    const chainId = await provider.getChainId()
    const accountSessionSignature = await openSession({
      wallet,
      sessionParams,
      chainId,
    })
    const sessionRequest = createSessionRequest(allowedMethods, expiry, metaData(false), dappKey.publicKey)
    if (!accountSessionSignature || !sessionRequest) {
      console.error('Session request failed')
      return
    }
    setSessionRequest(sessionRequest)
    setAccountSessionSignature(accountSessionSignature)
    if (!l2Account || !connectorData) {
      console.error('No address or connector data')
      return
    }
    const sessionAccount = await buildSessionAccount({
      accountSessionSignature: stark.formatSignature(accountSessionSignature),
      sessionRequest,
      provider,
      chainId,
      l2Account,
      dappKey,
      argentSessionServiceBaseUrl: process.env.REACT_APP_ARGENT_SESSION_SERVICE_BASE_URL
    })
    if (!sessionAccount) {
      console.error('Session account failed')
      return
    }
    setAccount(sessionAccount)
    setUsingSessionKeys(true)
  }

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
