import { animated, interpolate, useSpring } from '@react-spring/web'
import { Column, Row } from 'components/Flex'
import useScreenSize from 'hooks/useScreenSize'
import { useEffect, useMemo, useState } from 'react'
import { useDrag } from 'react-use-gesture'
import { num, shortString } from 'starknet'
import styled from 'styled-components'
import { ThemedText } from 'theme/components'
import { formatWithAbbreviation } from 'utils/format'
import { getRandomChart, getRandomInt, shuffleArray } from 'utils/random'

import { Memecoin, RawMemecoin } from './types'

const Container = styled(Column)`
  padding: 24px 24px 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const TokenCardContainer = styled(animated.div)`
  width: 100%;
`

const AnimatedColumn = animated(Column)

const AnimatedTokenCard = styled(AnimatedColumn)<{ $imageUrl: string }>`
  position: relative;
  padding: 16px 20px;
  border-radius: 24px;
  gap: 4px;
  background: ${({ theme }) => theme.surface3};
  width: 100%;
  overflow: hidden;
  aspect-ratio: 1 / 1.16;
  align-items: flex-start;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex-shrink: 0;
  touch-action: none;
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
  position: relative;
`

const Chart = styled.div<{ width: number; link: string; $up: boolean }>`
  width: 100%;
  background-image: url(${({ link }) => link});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: ${({ $up }) =>
    $up
      ? 'brightness(0) saturate(100%) invert(49%) sepia(82%) saturate(3530%) hue-rotate(87deg) brightness(119%) contrast(95%)'
      : 'brightness(0) saturate(100%) invert(15%) sepia(92%) saturate(6449%) hue-rotate(359deg) brightness(108%) contrast(114%)'};
  transform: scaleX(1.27);
  width: ${({ width }) => width}px;
  aspect-ratio: 4 / 1;
  margin-bottom: 42px;
`

const AmountContainer = styled(Row)`
  display: flex;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: absolute;
  z-index: 2;
  justify-content: center;
`

const AnimatedAmountContainer = animated(AmountContainer)

const Amount = styled(ThemedText.HeadlineLarge)`
  font-size: 64px !important;
  font-weight: 600;
`

// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(10deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

export default function SwipePage() {
  const [memecoinIndex, setMemecoinIndex] = useState(0)
  const [memecoins, setMemecoins] = useState<Memecoin[]>([])
  const [shouldFetch, setShouldFetch] = useState(true)
  const [amount, setAmount] = useState(0)
  const [imagesPreloaded, setImagesPreloaded] = useState(false)

  // fetch memecoins
  useEffect(() => {
    if (shouldFetch) {
      setShouldFetch(false)

      fetch('http://localhost:8080/get_memecoins')
        .then((response) => response.json())
        .then((res) => {
          setMemecoins(
            shuffleArray(res?.data ?? []).map((memecoin: RawMemecoin) => ({
              name: shortString.decodeShortString(num.toBigInt(`0x${memecoin.name}`).toString()),
              symbol: `$${shortString.decodeShortString(num.toBigInt(`0x${memecoin.symbol}`).toString())}`,
              imageUrl: `https://starkware-internal-hackathon-team-16.s3.eu-north-1.amazonaws.com/0x${memecoin.address}.png`,
            }))
          )
        })
    }
  }, [shouldFetch])

  const metrics = useMemo(
    () => {
      const mcap = (getRandomInt(100_000) + 4) * 1_000
      const holders = ((getRandomInt(5) + 1) * mcap) / 1269

      return {
        chart: getRandomChart(),
        mcap: formatWithAbbreviation(mcap, 1),
        holders: formatWithAbbreviation(holders, 1),
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [memecoinIndex]
  )

  const { width } = useScreenSize()

  // metrics animation
  const [metricsSpringProps, metricSpringApi] = useSpring(() => ({
    x: 0,
    scale: 0,
    config: { friction: 30, tension: 300 },
  }))

  // swiping gesture and animation
  const [{ x, rot, scale }, api] = useSpring(() => ({
    x: 0,
    rot: 0,
    scale: 1,
    config: { friction: 50, tension: 500 },
  }))

  const bind = useDrag(({ down, movement: [mx], direction: [xDir], velocity }) => {
    if (down) {
      setAmount((prev) => prev + Math.ceil(Math.abs(mx) / 100))
    }

    const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
    const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
    const isGone = !down && trigger // If you let go and it's triggered, fly out
    const isReleased = !down && !trigger // If you let go and it's not triggered, release

    const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
    const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
    const scale = down ? 1.1 : 1 // Active cards lift up a bit
    const metricsX = down ? 400 : 0
    const metricsScale = down ? 1 : 0

    if (isReleased) {
      setAmount(0)
    }

    api.start({
      x,
      rot,
      scale,
      config: { friction: 40, tension: down ? 800 : isGone ? 250 : 500 },
    })

    metricSpringApi.start({
      x: metricsX,
      scale: metricsScale,
      config: { friction: 40, tension: down ? 800 : 500 },
    })

    if (isGone) {
      setTimeout(() => {
        setMemecoinIndex((prev) => prev + 1)
        setAmount(0)

        metricSpringApi.start({ x: 0 })

        api.start({
          x: 0,
          rot: 0,
          scale: 0,
          config: { duration: 0 },
          onResolve: () => api.start({ scale: 1, config: { friction: 30, tension: 300 } }),
        })
      }, 500)
    }
  })

  // current memecoin
  const currentMemecoin = memecoins[memecoinIndex]

  // preload images
  useEffect(() => {
    if (imagesPreloaded || !memecoins.length) {
      return
    }

    // Method 1: Using Image object
    const preloadImages = () => {
      const imagePromises = memecoins.map((memecoin) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.src = memecoin.imageUrl
          img.onload = resolve
          img.onerror = reject
        })
      })

      Promise.all(imagePromises)
        .then(() => {
          console.log('Images preloaded')
          setImagesPreloaded(true)
        })
        .catch((err) => console.error('Error preloading images:', err))
    }

    preloadImages()
  }, [memecoins, imagesPreloaded])

  if (!currentMemecoin) {
    return null
  }

  console.log(currentMemecoin)

  return (
    <Container>
      <TokenCardContainer style={{ x }}>
        <AnimatedTokenCard
          {...bind()}
          $imageUrl={currentMemecoin.imageUrl}
          style={{ transform: interpolate([rot, scale], trans) }}
        >
          <Veil />

          <InfosContainer>
            <ThemedText.HeadlineMedium>{currentMemecoin.name}</ThemedText.HeadlineMedium>
            <ThemedText.BodySecondary>{currentMemecoin.symbol}</ThemedText.BodySecondary>
          </InfosContainer>
        </AnimatedTokenCard>
      </TokenCardContainer>

      <StatsContainer>
        <animated.div style={{ transform: metricsSpringProps.x.to((x: number) => `translateX(${-x}px)`) }}>
          <Column>
            <ThemedText.HeadlineLarge>{metrics.mcap}</ThemedText.HeadlineLarge>
            <ThemedText.BodySecondary>Market cap</ThemedText.BodySecondary>
          </Column>
        </animated.div>

        <animated.div style={{ transform: metricsSpringProps.x.to((x: number) => `translateX(${x}px)`) }}>
          <Column>
            <ThemedText.HeadlineLarge>{metrics.holders}</ThemedText.HeadlineLarge>
            <ThemedText.BodySecondary>Holders</ThemedText.BodySecondary>
          </Column>
        </animated.div>

        <AnimatedAmountContainer
          style={{ transform: metricsSpringProps.scale.to((scale: number) => `scale(${scale})`) }}
        >
          <Amount>${amount}</Amount>
        </AnimatedAmountContainer>
      </StatsContainer>

      <Chart width={width} $up={metrics.chart.up} link={metrics.chart.link} />
    </Container>
  )
}
