import { useConnect } from '@starknet-react/core'
import { Row } from 'components/Flex'
import { Connection, L2Connection } from 'connections'
import { styled } from 'styled-components'
import { ThemedText } from 'theme/components'

const StyledOption = styled(Row)`
  padding: 8px;
  cursor: pointer;
  position: relative;
  width: 100%;
  border: 3px solid transparent;
  background: ${({ theme }) => theme.surface2};
  border-radius: 8px;
  padding: 8px 16px;
`

interface OptionProps {
  connection: Connection
  activate: () => void
}

function Option({ connection, activate }: OptionProps) {
  return (
    <StyledOption gap={16} onClick={activate}>
      <img width="42" height="42" src={connection.getIcon?.()} />
      <ThemedText.BodyPrimary>{connection.getName()}</ThemedText.BodyPrimary>
    </StyledOption>
  )
}

interface L2OptionProps {
  connection: L2Connection
}

export function L2Option({ connection }: L2OptionProps) {
  // wallet activation
  const { connect } = useConnect()
  const activate = () => connect({ connector: connection.connector })

  return <Option connection={connection} activate={activate} />
}
