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

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: -4px;
    bottom: -4px;
    left: 8px;
    right: 8px;
    background: ${({ theme }) => theme.surface1};
    z-index: 1;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 8px;
    bottom: 8px;
    left: -4px;
    right: -4px;
    background: ${({ theme }) => theme.surface1};
    z-index: 1;
  }

  &:hover {
    border-color: ${({ theme }) => theme.neutral1};
  }

  & > * {
    z-index: 2;
  }
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
