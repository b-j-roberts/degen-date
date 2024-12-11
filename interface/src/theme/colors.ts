// Based mostly on https://github.com/Uniswap/interface/blob/main/src/theme/index.tsx

const colors = {
  white: '#FFFFFF',
  black: '#000000',

  error_dark: '#ff0030',

  neutral1_dark: '#ffffff',
  neutral2_dark: '#9B9B9B',

  accent1_dark: '#b387ca',
}

const commonTheme = {
  white: colors.white,
  black: colors.black,
}

export const darkTheme = {
  ...commonTheme,

  surface1: '#09080D',
  surface2: '#111113',

  neutral1: colors.neutral1_dark,
  neutral2: colors.neutral2_dark,

  error: colors.error_dark,

  accent1: colors.accent1_dark,
}
