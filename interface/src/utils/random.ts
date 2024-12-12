import { CHARTS } from 'constants/misc'

const getRandomInt = (max: number) => Math.floor(Math.random() * max)

export const getRandomChart = () => CHARTS[getRandomInt(CHARTS.length)]
