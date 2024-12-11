import NavBar from 'components/NavBar'
import useScreenSize from 'hooks/useScreenSize'
import { styled } from 'styled-components'

const Section = styled.section<{ height: number }>`
  width: 100%;
  height: ${({ theme, height }) => height - theme.navBarHeight}px;
`

export default function AppLayout({ children }: React.HTMLAttributes<HTMLDivElement>) {
  const size = useScreenSize()

  if (!size) {
    return null
  }

  return (
    <Section height={size.height}>
      <NavBar />
      {children}
    </Section>
  )
}
