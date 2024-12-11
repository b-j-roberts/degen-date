// Based mostly on https://github.com/Uniswap/interface/blob/main/src/theme/index.tsx

const colors = {
  white: '#FFFFFF',
  black: '#000000',

  error_dark: '#ff0030',

  neutral1_dark: '#f7f7f7',
  accent1_dark: '#e1e71d',
}

const commonTheme = {
  white: colors.white,
  black: colors.black,
}

export const darkTheme = {
  ...commonTheme,

  bg1: '#0b0d0f',
  bg2: '#1c2127',

  neutral1: colors.neutral1_dark,
  error: colors.error_dark,
  accent1: colors.accent1_dark,
}
