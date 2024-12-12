const trimTrailZero = (numberStr?: string) => {
  // eslint-disable-next-line prefer-const
  let [intergerPart, decimalPart] = numberStr?.split('.') ?? []
  if (!intergerPart || !decimalPart) {
    return numberStr
  }

  while (decimalPart[decimalPart.length - 1] === '0') {
    decimalPart = decimalPart.slice(0, -1)
  }

  return decimalPart.length ? `${intergerPart}.${decimalPart}` : intergerPart
}

export function formatWithAbbreviation(value: number, numDecimals: number) {
  const thresholds = [
    { sign: 'T', value: 1e12 },
    { sign: 'B', value: 1e9 },
    { sign: 'M', value: 1e6 },
    { sign: 'K', value: 1e3 },
  ]

  for (const threshold of thresholds) {
    if (value >= threshold.value) {
      const abbreviatedValue = trimTrailZero((value / threshold.value).toFixed(numDecimals))
      return `${abbreviatedValue}${threshold.sign}`
    }
  }

  return trimTrailZero(value.toFixed(numDecimals)) || ''
}
