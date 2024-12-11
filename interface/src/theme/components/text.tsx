/**
 * Preset styles of the Rebass Text component
 */

import { Text, TextProps as TextPropsOriginal } from 'rebass'
import styled from 'styled-components'

const TextWrapper = styled(Text).withConfig({
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color: keyof string }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

type TextProps = Omit<TextPropsOriginal, 'css'>

// todo: export each component individually
export const ThemedText = {
  // todo: there should be just one `Body` with default color, no need to make all variations
  BodyPrimary(props: TextProps) {
    return <TextWrapper fontWeight={485} fontSize={16} color="neutral1" {...props} />
  },
  BodySecondary(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color="neutral2" {...props} />
  },
  HeadlineSmall(props: TextProps) {
    return <TextWrapper fontWeight={485} fontSize={20} lineHeight="28px" color="neutral1" {...props} />
  },
  HeadlineMedium(props: TextProps) {
    return <TextWrapper fontWeight={485} fontSize={28} color="neutral1" {...props} />
  },
  HeadlineLarge(props: TextProps) {
    return <TextWrapper fontWeight={485} fontSize={36} lineHeight="44px" color="neutral1" {...props} />
  },
}
