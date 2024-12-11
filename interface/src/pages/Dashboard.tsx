import { Row } from 'components/Flex'
import { useStartSession } from 'hooks/useAccount'
import { styled } from 'styled-components'
import { ThemedText } from 'theme/components'

const StyledDashboard = styled(Row)`
  padding: 20px;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const StyledSessionButton = styled(Row)`
  padding: 16px;
  background-color: ${({ theme }) => theme.surface2};
  border-radius: 8px;
  cursor: pointer;
`

export default function DashboardPage() {
  const { startSession } = useStartSession()

  return (
    <StyledDashboard>
      <ThemedText.BodyPrimary>Dashboard</ThemedText.BodyPrimary>
      <StyledSessionButton gap={16} onClick={startSession}>
        <ThemedText.BodyPrimary>Start Session</ThemedText.BodyPrimary>
      </StyledSessionButton>
    </StyledDashboard>
  )
}
