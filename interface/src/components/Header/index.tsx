import logo from 'assets/logo.png'
import { Row } from 'components/Flex'
import Web3Status from 'components/Web3Status'
import { styled } from 'styled-components'

const StyledHeader = styled(Row)`
  position: sticky;
  z-index: 1000;
  padding: 16px 24px;
  justify-content: space-between;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`

const Logo = styled.img`
  width: 32px;
  height: 32px;
`

export default function Header() {
  return (
    <StyledHeader>
      <Logo src={logo} />
      <Web3Status />
    </StyledHeader>
  )
}
