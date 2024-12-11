import {Column} from 'components/Flex';
import {styled} from 'styled-components';
import {ThemedText} from 'theme/components';
import {SwipeContainer} from './SwipeContainer';

const TokenName = styled(ThemedText.BodyPrimary)`
  font-size: 28px;
  font-weight: 600;
  color: ${({theme}) => theme.neutral1};
`;

const TickerName = styled(ThemedText.BodyPrimary)`
  font-size: 16px;
  font-weight: 400;
  color: ${({theme}) => theme.neutral2};
`;

// const TokenImage = styled.img`
//  position: absolute;
//   right: 16px;
//   bottom: 16px;
//   color: ${({ theme }) => theme.neutral2};
//   z-index: 1;
// `
const TokenCard = styled(Column)`
  position: relative;
  padding: 16px 20px;
  border-radius: 24px;
  gap: 4px;
  background: ${({theme}) => theme.surface3};
  width: 100%;
  height: 110vw;
  overflow: hidden;
  aspect-ratio: 1 / 1.16;
  align-items: flex-start;
  flex-shrink: 0;
  backdrop-filter: blur(16px);

  &:after {
    content: '';
    position: absolute;
    background: ${({theme}) => theme.surface2};
    border-radius: 32px;
    width: 200%;
    height: 200%;
    transform: translate(-25%, 30%) rotate(-45deg);
  }

  &:before {
    content: '';
    position: absolute;
    background: ${({theme}) => theme.surface2};
    border-radius: 100px;
    width: 25vw;
    height: 25vw;
    top: 20px;
    right: 20px;
  }
`;

export default function SwipePage() {
  return (
    <SwipeContainer>
      <ThemedText.BodyPrimary>
        <TokenCard>
          <TokenName>Token Name</TokenName>
          <TickerName>TICKER</TickerName>
          {/* <TokenImage src={token.imageUrl} alt="Token Image" /> */}
        </TokenCard>
      </ThemedText.BodyPrimary>
    </SwipeContainer>
  );
}
