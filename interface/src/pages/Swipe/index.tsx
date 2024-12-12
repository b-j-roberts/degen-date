import axios from 'axios'
import { Column, Row } from 'components/Flex'
import useScreenSize from 'hooks/useScreenSize'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { ThemedText } from 'theme/components'
import { getRandomChart } from 'utils/random'

import { SwipeContainer } from './SwipeContainer'

const Container = styled(Column)`
  padding: 24px 24px 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const TokenCard = styled(Column)<{ imageUrl: string }>`
  position: relative;
  padding: 16px 20px;
  border-radius: 24px;
  gap: 4px;
  background: ${({ theme }) => theme.surface3};
  width: 100%;
  overflow: hidden;
  aspect-ratio: 1 / 1.16;
  align-items: flex-start;
  background-image: url(${({ imageUrl }) => imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex-shrink: 0;
`

const Veil = styled.div`
  position: absolute;
  background-image: linear-gradient(180deg, ${({ theme }) => theme.surface2} 0%, transparent 50%);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 24px;
  z-index: 1;
`

const InfosContainer = styled(Column)`
  display: flex;
  gap: 4px;
  z-index: 2;
  align-items: flex-start;
`

const StatsContainer = styled(Row)`
  justify-content: space-around;
  width: 100%;
  height: 100%;
`

const Chart = styled.div<{ width: number; link: string; up: boolean }>`
  width: 100%;
  background-image: url(${({ link }) => link});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: ${({ up }) =>
    up
      ? 'brightness(0) saturate(100%) invert(49%) sepia(82%) saturate(3530%) hue-rotate(87deg) brightness(119%) contrast(95%)'
      : 'brightness(0) saturate(100%) invert(15%) sepia(92%) saturate(6449%) hue-rotate(359deg) brightness(108%) contrast(114%)'};
  transform: scaleX(1.27);
  width: ${({ width }) => width}px;
  aspect-ratio: 4 / 1;
  margin-bottom: 42px;
`

const getNextToken = (setter: CallableFunction) => {
  axios.get('http://localhost:3000/api/nextToken').then((response: any) => {
    const token = response.data
    setter(token)
  })
}

export default function SwipePage() {
  const imageUrl =
    'https://www.nzherald.co.nz/resizer/v2/MZPPXBD4JBFNTM5NUPXBZOD5UM.jpg?auth=e22b3cd8e19b5d3ecc74617bad44fceb9649ad590d6c12637f225e0db382cd57&width=576&height=613&quality=70&smart=true'

  const chart = useMemo(() => getRandomChart(), [])

  const { width } = useScreenSize()

  const [token, currentToken] = useState({})

  return (
    <SwipeContainer>
      <TokenCard imageUrl={imageUrl}>
        <Veil />
        <InfosContainer>
          <ThemedText.HeadlineMedium>Peanut the squirrel</ThemedText.HeadlineMedium>
          <ThemedText.BodySecondary>$PNUT</ThemedText.BodySecondary>
        </InfosContainer>
      </TokenCard>

      <StatsContainer>
        <Column>
          <ThemedText.HeadlineLarge>126M</ThemedText.HeadlineLarge>
          <ThemedText.BodySecondary>Market cap</ThemedText.BodySecondary>
        </Column>

        <Column>
          <ThemedText.HeadlineLarge>75K</ThemedText.HeadlineLarge>
          <ThemedText.BodySecondary>Holders</ThemedText.BodySecondary>
        </Column>
      </StatsContainer>

      <Chart width={width} {...chart} />
    </SwipeContainer>
  )
}
