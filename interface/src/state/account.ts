import { buildSessionAccount, createSessionRequest, openSession } from '@argent/x-sessions'
import { constants, ec, RpcProvider, stark } from 'starknet'
import { connect } from 'starknetkit-next'
import { StateCreator } from 'zustand'

import { StoreState } from './index'

export type AccountSlice = State & Actions

interface State {
  wallet: any
  connectorData: any
  connector: any
  account: any
  address: any
  isSessionable: boolean
  sessionRequest: any
  accountSessionSignature: any
  usingSession: boolean
}

interface Actions {
  isConnected: () => boolean
  connectWallet: () => void
  disconnectWallet: () => void
  startSession: () => void
}

// TODO
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

const provider = new RpcProvider({
  nodeUrl: 'https://starknet-sepolia.public.blastapi.io/rpc/v0_7',
  chainId: constants.StarknetChainId.SN_SEPOLIA,
})

const canSession = (wallet: any) => {
  const sessionableIds = [
    'argentX',
    'ArgentX',
    'argent',
    'Argent',
    'argentMobile',
    'ArgentMobile',
    'argentWebWallet',
    'ArgentWebWallet',
  ]
  if (sessionableIds.includes(wallet.id)) {
    return true
  }
  return false
}

const ETHFees = [
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

export const createAccountSlice: StateCreator<StoreState, [['zustand/immer', never]], [], AccountSlice> = (
  set,
  get
) => ({
  wallet: null,
  connectorData: null,
  connector: null,
  account: null,
  address: null,
  isSessionable: false,
  sessionRequest: null,
  accountSessionSignature: null,
  usingSession: false,

  isConnected: () => {
    return get().wallet !== null && get().connectorData !== null && get().connector !== null
  },
  connectWallet: async () => {
    const { wallet, connectorData, connector } = await connect({
      modalMode: 'alwaysAsk',
      webWalletUrl: process.env.REACT_APP_ARGENT_WEBWALLET_URL,
      argentMobileOptions: {
        dappName: 'degen-date',
        url: window.location.hostname,
        chainId: constants.NetworkName.SN_SEPOLIA,
        icons: [],
      },
    })
    let new_account: any = null
    if (wallet && connectorData && connector) {
      new_account = await connector.account(provider)
    }
    set((state) => {
      if (wallet && connectorData && connector && new_account) {
        state.wallet = wallet
        state.connectorData = connectorData
        state.connector = connector
        state.account = new_account
        state.address = connectorData.account
      }
    })
  },
  disconnectWallet: () => {
    set((state) => {
      state.wallet = null
      state.connectorData = null
      state.connector = null
      state.account = null
      state.address = null
      state.isSessionable = false
      state.sessionRequest = null
      state.accountSessionSignature = null
    })
  },
  startSession: async () => {
    const sessionParams = {
      allowedMethods,
      expiry,
      metaData: metaData(false),
      publicDappKey: dappKey.publicKey,
    }
    const chainId = await provider.getChainId()
    const l2Wallet: any = get().wallet
    const accountSessionSignature = await openSession({
      wallet: l2Wallet,
      sessionParams,
      chainId,
    })
    const sessionRequest = createSessionRequest(allowedMethods, expiry, metaData(false), dappKey.publicKey)
    if (!accountSessionSignature || !sessionRequest) {
      console.error('Session request failed')
      return
    }
    if (!get().account || !get().connectorData) {
      console.error('No address or connector data')
      return
    }
    const l2Address: any = get().address
    const sessionAccount = await buildSessionAccount({
      accountSessionSignature: stark.formatSignature(accountSessionSignature),
      sessionRequest,
      provider,
      chainId,
      address: l2Address,
      dappKey,
      argentSessionServiceBaseUrl: process.env.REACT_APP_ARGENT_SESSION_SERVICE_BASE_URL,
    })
    if (!sessionAccount) {
      console.error('Session account failed')
      return
    }
    set((state) => {
      state.account = sessionAccount
      state.sessionRequest = sessionRequest
      state.accountSessionSignature = accountSessionSignature
      state.usingSession = true
    })
  },
})
