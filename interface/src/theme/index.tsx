import React, { useMemo } from 'react'
import { createGlobalStyle, ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'

import { darkTheme } from './colors'

const NAV_BAR_HEIGHT = 64

const opacities = {
  hover: 0.6,
  click: 0.4,
  disabled: 0.5,
  enabled: 1,
}

function getSettings() {
  return {
    navBarHeight: NAV_BAR_HEIGHT,

    opacity: opacities,
  }
}

export function getTheme() {
  return {
    ...darkTheme,
    ...getSettings(),
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeObject = useMemo(() => getTheme(), [])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

export const ThemedGlobalStyle = createGlobalStyle`
  html {
    color: ${({ theme }) => theme.neutral1};
    background-color: ${({ theme }) => theme.surface1} !important;
  }

  body {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }

  summary::-webkit-details-marker {
    display:none;
  }
`
