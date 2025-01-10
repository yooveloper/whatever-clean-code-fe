import { useState } from 'react'
import { validateLottoAmount } from '@/features/lotto/utils/lotto'

const useLotto = () => {
  const [lottoAmount, setLottoAmount] = useState('')
  const [lottoErrorMessage, setLottoErrorMessage] = useState<
    string | undefined
  >('')

  const handlePurchaseLotto = () => {
    const validationResult = validateLottoAmount(lottoAmount)

    if (!validationResult.isValid) {
      setLottoErrorMessage(validationResult.message)
      return
    }
  }

  return {
    lottoAmount,
    setLottoAmount,
    lottoErrorMessage,
    handlePurchaseLotto,
  }
}

export default useLotto
