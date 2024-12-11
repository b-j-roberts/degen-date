import { PrimaryButton } from 'components/Button'
import { Column } from 'components/Flex'
import Input from 'components/Input'
import { useAtom } from 'jotai'
import { Pencil, Rocket } from 'lucide-react'
import { useCallback, useRef } from 'react'
import styled from 'styled-components'
import { ThemedText } from 'theme/components'

import { formFieldsAtom } from './atom'
import { FieldName, schema } from './utils'

const Container = styled(Column)`
  padding: 24px 24px 0;
  width: 100%;
  height: 100%;
`

const TokenCard = styled(Column)`
  position: relative;
  padding: 16px 20px;
  border-radius: 24px;
  gap: 4px;
  background: ${({ theme }) => theme.surface3};
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
    background: ${({ theme }) => theme.surface2};
    border-radius: 32px;
    width: 200%;
    height: 200%;
    transform: translate(-25%, 30%) rotate(-45deg);
  }

  &:before {
    content: '';
    position: absolute;
    background: ${({ theme }) => theme.surface2};
    border-radius: 100px;
    width: 25vw;
    height: 25vw;
    top: 20px;
    right: 20px;
  }
`

const ButtonContainer = styled(Column)`
  justify-content: center;
  height: 100%;
`

const TokenNameInput = styled(Input)`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.neutral1};
`

const TickerNameInput = styled(Input)`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.neutral2};
`

const EditImage = styled(Pencil)`
  position: absolute;
  right: 16px;
  bottom: 16px;
  color: ${({ theme }) => theme.neutral2};
  z-index: 1;
`

export default function LaunchPage() {
  const [formFields, setFormFields] = useAtom(formFieldsAtom)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onUserInput = useCallback(
    (fieldName: FieldName) => {
      return (value: string) => {
        const parsedValue = schema[fieldName].safeParse(value)

        if (parsedValue.success) {
          setFormFields((prev) => ({ ...prev, [fieldName]: value }))
        }
      }
    },
    [setFormFields]
  )

  const onUploadImage = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleImageUpload = useCallback(() => {
    console.log('upload image')
  }, [])

  return (
    <Container>
      <TokenCard>
        <TokenNameInput value={formFields.name} onUserInput={onUserInput('name')} placeholder="Token Name" />
        <TickerNameInput value={formFields.ticker} onUserInput={onUserInput('ticker')} placeholder="TICKER">
          <ThemedText.BodySecondary>$</ThemedText.BodySecondary>
        </TickerNameInput>

        <EditImage size={32} onClick={onUploadImage} />

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          style={{ visibility: 'hidden' }}
        />
      </TokenCard>

      <ButtonContainer>
        <PrimaryButton>
          <Rocket size={32} />
          Launch
        </PrimaryButton>
      </ButtonContainer>
    </Container>
  )
}
