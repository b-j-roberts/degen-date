import { useAccount, useContractWrite } from '@starknet-react/core'
import { SecondaryButton } from 'components/Button'
import { Column } from 'components/Flex'
import { CLICKER_ADDRESS } from 'constants/contracts'
import { CLICK_ENTRYPOINT } from 'constants/misc'
import useClicks from 'hooks/useClicks'
import { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { ThemedText } from 'theme/components'

const Section = styled.section`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 100px 12px 32px;
`

const Error = styled(ThemedText.HeadlineLarge)`
  color: ${({ theme }) => theme.error};
  animation: shake 250ms ease-in-out;

  @keyframes shake {
    33% {
      transform: translateX(-12px);
    }

    66% {
      transform: translateX(12px);
    }
  }
`

const Retry = styled(ThemedText.HeadlineSmall)`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const Status = styled(ThemedText.HeadlineSmall)`
  padding-left: 28px;
  text-align: left;
  width: 100%;
`

export default function HomePage() {
  const { address: accountAddress } = useAccount()

  // balances
  const clicks = useClicks()

  // click
  const { writeAsync, isPending } = useContractWrite({})
  const click = useCallback(async () => {
    try {
      await writeAsync({
        calls: [
          {
            contractAddress: CLICKER_ADDRESS,
            entrypoint: CLICK_ENTRYPOINT,
            calldata: [],
          },
        ],
      })

      clicks.refetch()
    } catch (err) {
      console.error(err)
    }
  }, [clicks, writeAsync])

  // error & loading
  const loading = isPending

  if (clicks.error) {
    console.error(clicks.error)
  }

  // status
  const status = useMemo(() => {
    if (!accountAddress) return 'No wallet connected.'

    if (loading) return 'Loading...'

    return <>&nbsp;</>
  }, [accountAddress, loading])

  return (
    <Section>
      {accountAddress && clicks.error ? (
        <Column gap={8}>
          <Error>Error</Error>
          <Retry onClick={() => clicks.refetch()}>Retry</Retry>
        </Column>
      ) : (
        <Column gap={32}>
          <Column gap={64}>
            <Status>{status}</Status>

            {clicks.data && (
              <Column gap={32}>
                <Column gap={8}>
                  <ThemedText.HeadlineSmall>
                    Total clicks: {clicks.data?.total.toString() ?? '-'}
                  </ThemedText.HeadlineSmall>

                  <ThemedText.HeadlineSmall>
                    Your clicks: {clicks.data?.fromCaller.toString() ?? '-'}
                  </ThemedText.HeadlineSmall>
                </Column>

                <SecondaryButton onClick={click}>CLICK</SecondaryButton>
              </Column>
            )}
          </Column>
        </Column>
      )}
    </Section>
  )
}
