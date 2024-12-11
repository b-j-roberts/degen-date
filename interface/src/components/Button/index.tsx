import { styled } from 'styled-components'

export const PrimaryButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 12px 32px;
  color: ${({ theme }) => theme.neutral1};
  outline: none;
  font-size: 24px;
  font-weight: 500;
  transition: opacity 100ms;

  background: radial-gradient(50% 50% at 50% 50%, #6321f2 0%, #7236f3 100%);
  box-shadow: ${({ theme }) => `0px 4px 4px ${theme.surface1}40, 0px 4px 20px 4px ${theme.accent1}64`};
  border: 2px solid ${({ theme }) => theme.neutral1}60;
  border-radius: 14px;

  &:focus {
    background: ${({ theme }) => theme.accent1};
    opacity: 0.8;
  }
`
