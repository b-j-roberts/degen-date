import { Row } from 'components/Flex'
import { ChangeEvent, useCallback } from 'react'
import { styled } from 'styled-components'

function InputBase({ onUserInput, ...props }: InputProps) {
  const handleInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onUserInput(event.target.value)
    },
    [onUserInput]
  )

  return <input onChange={handleInput} {...props} />
}

const InputWrapper = styled(Row)<{ $valid: boolean }>`
  position: relative;
  background: transparent;
  border: none;

  &:focus-within {
    outline: none;
  }
`

const StyledInput = styled(InputBase)`
  border: none;
  background: transparent;
  width: 100%;
  outline: none;

  &::placeholder {
    opacity: 0.5;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
`

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  $valid?: boolean
  onUserInput: (value: string) => void
}

export default function Input({ children, $valid = true, onUserInput, ...props }: InputProps) {
  return (
    <InputWrapper $valid={$valid}>
      {children}
      <StyledInput onUserInput={onUserInput} {...props} />
    </InputWrapper>
  )
}
