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

  &:disabled {
    background: ${({ theme }) => theme.neutral1}40;
    box-shadow: none;
    opacity: 0.6;
  }
`

export const SecondaryButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  color: ${({ theme }) => theme.neutral1};
  outline: none;
  font-size: 16px;
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

export const CircleButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  outline: none;
  font-size: 24px;
  font-weight: 500;
  transition: opacity 100ms;

  background: radial-gradient(50% 50% at 50% 50%, #6321f2 0%, #7236f3 100%);
  box-shadow: ${({ theme }) => `0px 4px 4px ${theme.surface1}40, 0px 4px 20px 4px ${theme.accent1}64`};
  border: 2px solid ${({ theme }) => theme.neutral1}60;
  border-radius: 50%;

  &:focus {
    background: ${({ theme }) => theme.accent1};
    opacity: 0.8;
  }
`
