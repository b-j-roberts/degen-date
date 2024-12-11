import { styled } from 'styled-components'

export const SecondaryButton = styled.button`
  font-size: 20px;
  color: ${({ theme }) => theme.surface1};
  background: ${({ theme }) => theme.neutral1};
  cursor: pointer;
  position: relative;
  padding: 6px 8px;
  margin: 0 10px;
  width: auto;
  border: none;
  outline: none;
  font-weight: 600;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:enabled:active {
    transform: translateY(2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: -10px;
    right: -10px;
    background: ${({ theme }) => theme.neutral1};
    z-index: -1;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 4px;
    bottom: 4px;
    left: -6px;
    right: -6px;
    background: ${({ theme }) => theme.neutral1};
    z-index: -1;
  }
`
