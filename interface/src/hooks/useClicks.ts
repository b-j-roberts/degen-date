import { useAccount, useContractRead, UseContractReadResult } from '@starknet-react/core'
import { CLICKER_ADDRESS, compiledMulticall, MULTICALL_ADDRESS } from 'constants/contracts'
import { CLICKS_OF_SELECTOR, TOTAL_CLICKS_SELECTOR } from 'constants/misc'
import { useMemo } from 'react'
import { BlockTag } from 'starknet'

interface Clicks {
  total: bigint
  fromCaller: bigint
}

interface UseClicksResult extends Pick<UseContractReadResult, 'error' | 'refetch'> {
  data?: Clicks
  loading: boolean
}

export default function useClicks(): UseClicksResult {
  const { address: accountAddress } = useAccount()

  const res = useContractRead({
    blockIdentifier: BlockTag.PENDING,
    abi: compiledMulticall, // call is not send if abi is undefined
    address: accountAddress ? MULTICALL_ADDRESS : undefined,
    functionName: 'aggregate',
    watch: true,
    args: [
      [
        {
          to: CLICKER_ADDRESS,
          selector: TOTAL_CLICKS_SELECTOR,
          calldata: [],
        },
        {
          to: CLICKER_ADDRESS,
          selector: CLICKS_OF_SELECTOR,
          calldata: [accountAddress],
        },
      ],
    ],
  }) as UseContractReadResult & { data?: [bigint, [bigint, bigint]] }

  console.log(res)

  const data = useMemo(() => {
    if (!res.data) return undefined

    return {
      total: res.data[1][0],
      fromCaller: res.data[1][1],
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res.data?.[0].toString()])

  return { data, loading: res.fetchStatus === 'fetching', error: res.error, refetch: res.refetch }
}
