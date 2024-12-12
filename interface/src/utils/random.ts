import { CHARTS } from 'constants/misc'

export const getRandomInt = (max: number) => Math.floor(Math.random() * max)

export const getRandomChart = () => CHARTS[getRandomInt(CHARTS.length)]

export function shuffleArray(array: any[]) {
  let currentIndex = array.length

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    const randomIndex = getRandomInt(currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}
