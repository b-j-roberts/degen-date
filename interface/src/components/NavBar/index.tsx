import { Row } from 'components/Flex'
import { ActiveLink } from 'components/Link/ActiveLink'
import { Heart, LayoutDashboard, Rocket } from 'lucide-react'
import { styled } from 'styled-components'

const StyledNavBar = styled(Row)`
  justify-content: space-around;
  position: fixed;
  z-index: 1000;
  max-width: ${({ theme }) => theme.maxWidth};
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.surface2};
  border-radius: 16px 16px 0 0;
  height: ${({ theme }) => theme.navBarHeight}px;
`

const NavLink = styled(ActiveLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.neutral1};

  & > svg.active {
    fill: ${({ theme }) => theme.neutral1};
  }
`

export default function NavBar() {
  return (
    <StyledNavBar>
      <NavLink to="/dashboard">
        <LayoutDashboard />
      </NavLink>

      <NavLink to="/swipe">
        <Heart />
      </NavLink>

      <NavLink to="/launch">
        <Rocket />
      </NavLink>
    </StyledNavBar>
  )
}
