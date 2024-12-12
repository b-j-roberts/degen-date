import { useAccount, useContractWrite } from '@starknet-react/core'
import axios from 'axios'
import { PrimaryButton } from 'components/Button'
import { Column, Row } from 'components/Flex'
import Input from 'components/Input'
import { MEMECOIN_CLASS_HASH, STRK_ADDRESS, UNRUG_FACTORY_ADDRESS } from 'constants/contracts'
import { DEFAULT_SUPPLY, Entrypoint } from 'constants/misc'
import { useAtom } from 'jotai'
import { Pencil, Rocket } from 'lucide-react'
import { useCallback, useMemo, useRef } from 'react'
import { CallData, hash, shortString, stark, uint256 } from 'starknet'
import styled from 'styled-components'
import { ThemedText } from 'theme/components'

import { formFieldsAtom } from './atom'
import { FieldName, schema } from './utils'

const Container = styled(Column)`
  padding: 24px 24px 0;
  width: 100%;
  height: 100%;
`

const TokenCard = styled(Column)<{ image: FileReader['result'] }>`
  position: relative;
  padding: 16px 20px;
  border-radius: 24px;
  gap: 4px;
  background: ${({ theme }) => theme.surface3};
  width: 100%;
  overflow: hidden;
  aspect-ratio: 1 / 1.16;
  align-items: flex-start;
  flex-shrink: 0;

  ${({ theme, image }) =>
    image
      ? `
    background-image: url(${image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  `
      : `
  &:after {
    content: '';
    position: absolute;
    background: ${theme.surface2};
    border-radius: 32px;
    width: 200%;
    height: 200%;
    transform: translate(-25%, 30%) rotate(-45deg);
    z-index: 0;
  }

  &:before {
    content: '';
    position: absolute;
    background: ${theme.surface2};
    border-radius: 100px;
    width: 25vw;
    height: 25vw;
    top: 20px;
    right: 20px;
  }
  `}
`

const Veil = styled.div`
  position: absolute;
  background-image: linear-gradient(180deg, ${({ theme }) => theme.surface2} 0%, transparent 50%);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 24px;
  z-index: 1;
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

const EditImage = styled(Row)`
  position: absolute;
  right: 16px;
  bottom: 16px;
  color: ${({ theme }) => theme.neutral1};
  z-index: 1;
  background: ${({ theme }) => theme.surface1}80;
  border-radius: 50%;
  padding: 16px;
`

const InputsContainer = styled.div`
  z-index: 1;
`

export default function LaunchPage() {
  const [formFields, setFormFields] = useAtom(formFieldsAtom)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // text inputs
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

  // image upload
  const onUploadImage = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]

      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setFormFields((prev) => ({ ...prev, picture: reader.result }))
        }
        reader.readAsDataURL(file)
      }
    },
    [setFormFields]
  )

  // form check
  const canLaunch = useMemo(() => {
    return Object.values(formFields).every((value) => !!value)
  }, [formFields])

  // transaction
  const { address } = useAccount()
  const { writeAsync, isPending } = useContractWrite({})
  const launch = useCallback(async () => {
    if (!address || !canLaunch || isPending) {
      return
    }

    const salt = stark.randomAddress()

    const constructorCalldata = CallData.compile([
      address,
      shortString.encodeShortString(formFields.name),
      shortString.encodeShortString(formFields.ticker),
      uint256.bnToUint256(DEFAULT_SUPPLY),
      salt,
    ])

    const tokenAddress = hash.calculateContractAddressFromHash(
      salt,
      MEMECOIN_CLASS_HASH,
      constructorCalldata.slice(0, -1),
      UNRUG_FACTORY_ADDRESS
    )

    try {
      await writeAsync({
        calls: [
          {
            contractAddress: UNRUG_FACTORY_ADDRESS,
            entrypoint: Entrypoint.CreateMemecoin,
            calldata: constructorCalldata,
          },
          {
            contractAddress: UNRUG_FACTORY_ADDRESS,
            entrypoint: Entrypoint.LaunchOnEkubo,
            calldata: [
              tokenAddress, // memecoin_address
              '86400', // 24h transfer_restriction_delay
              '100', // 1% max_percentage_buy_launch
              STRK_ADDRESS, // quote_address
              '0', // initial_holders
              '0', // initial_holders_amounts
              '1020847100762815390390123822295304634', // 0.3% fees
              '5982', // tick spacing
              '11078664', // starting price for a 10M mcap
              '1', // straing price magnitude
              '88719042', // pool bound
            ],
          },
        ],
      })
    } catch (err) {
      console.error(err)
    }

    const formData = new FormData()
    const file = fileInputRef.current?.files?.[0]
    let tokenAddressName = tokenAddress.slice(2)
    tokenAddressName = tokenAddressName.padStart(64, '0')
    formData.append('contractAddress', tokenAddressName)
    formData.append('image', file as any)
    try {
      const response = await axios.post('http://localhost:8080/upload-memecoin-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(response.data)
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }, [address, canLaunch, formFields.name, formFields.ticker, isPending, writeAsync])

  return (
    <Container>
      <TokenCard image={formFields.picture}>
        <Veil />

        <InputsContainer>
          <TokenNameInput value={formFields.name} onUserInput={onUserInput('name')} placeholder="Token Name" />
          <TickerNameInput value={formFields.ticker} onUserInput={onUserInput('ticker')} placeholder="TICKER">
            <ThemedText.BodySecondary>$</ThemedText.BodySecondary>
          </TickerNameInput>

          <EditImage onClick={onUploadImage}>
            <Pencil size={32} />
          </EditImage>
        </InputsContainer>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          style={{ visibility: 'hidden' }}
        />
      </TokenCard>

      <ButtonContainer>
        <PrimaryButton onClick={launch} disabled={!canLaunch}>
          <Rocket size={32} />
          Launch
        </PrimaryButton>
      </ButtonContainer>
    </Container>
  )
}
