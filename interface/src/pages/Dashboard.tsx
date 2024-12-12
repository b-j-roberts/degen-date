import { useDisconnect } from '@starknet-react/core'
import { CircleButton, PrimaryButton, SecondaryButton } from 'components/Button'
import { Column, Row } from 'components/Flex'
import { ActiveLink } from 'components/Link/ActiveLink'
import { useBoundStore } from 'state'
import styled from 'styled-components'
import { ThemedText } from 'theme/components'

const Container = styled(Column)`
  padding: 24px 24px 0;
  width: 100%;
  height: 100%;
`

const DashboardHeader = styled(Row)`
  border-bottom: 2px solid #ffffff80;
  justify-content: space-between;
  font-size: 18px;
  width: 100%;
  padding: 0;
  justify-content: center;
`

const DashboardInfo = styled(Column)`
  position: relative;
  padding: 16px 20px;
  border-radius: 24px;
  gap: 4px;
  background: ${({ theme }) => theme.surface3};
  width: 100%;
  height: 110vw;
  overflow: hidden;
  aspect-ratio: 1 / 1.16;
  align-items: flex-start;
  flex-shrink: 0;
  backdrop-filter: blur(16px);
`

const Asset = styled(Row)`
  padding: 8px;
  border-bottom: 1px solid #ffffff80;
  width: 100%;
`

const AssetInfo = styled(Row)`
  flex: 1;
`

const AssetBalance = styled(Row)`
  gap: 8px;
`

const ButtonContainer = styled(Column)`
  justify-content: center;
  width: 100%;
  margin-top: 8px;
`

const TokenIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
`

const NavLink = styled(ActiveLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.neutral1};

  & > svg.active {
    fill: ${({ theme }) => theme.neutral1};
  }
`

export default function DashboardPage() {
  const assets = useBoundStore((state) => state.tokens)

  function balance(amount: number) {
    if(amount > 1000000) {
      return (amount / 1000000).toFixed(2) + "M"
    }
    return amount
  }

  const { disconnect } = useDisconnect()

  return (
    <Container>
      <DashboardInfo>
        <Asset>
          <AssetInfo>
            <ThemedText.BodyPrimary>My Assets&nbsp;</ThemedText.BodyPrimary>
          </AssetInfo>
          <ThemedText.BodyPrimary>Balance</ThemedText.BodyPrimary>
        </Asset>
        {assets.map((asset) => (
          <Asset key={asset.ticker}>
            <AssetInfo>
              <TokenIcon src="https://dv3jj1unlp2jl.cloudfront.net/128/color/brother.png" alt="ETH" />
              <ThemedText.BodyPrimary>{asset.name}&nbsp;</ThemedText.BodyPrimary>
              <ThemedText.BodySecondary>({asset.ticker})</ThemedText.BodySecondary>
            </AssetInfo>
            <AssetBalance>
              <ThemedText.BodySecondary>${balance(asset.balance * asset.conversion)}</ThemedText.BodySecondary>
              <CircleButton>+</CircleButton>
            </AssetBalance>
          </Asset>
        ))}
        <ButtonContainer>
          <NavLink to="/swipe">
            <SecondaryButton>Explore</SecondaryButton>
          </NavLink>
        </ButtonContainer>
      </DashboardInfo>
      <ButtonContainer>
        <PrimaryButton onClick={() => disconnect()}>Logout</PrimaryButton>
      </ButtonContainer>
    </Container>
  )
}
