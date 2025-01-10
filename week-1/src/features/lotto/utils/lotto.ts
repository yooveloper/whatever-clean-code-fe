import {
  LOTTO_ERROR_MESSAGES,
  LOTTO_PURCHASE_AMOUT_UNIT,
} from '@/features/lotto/constants/lotto'

import { isNumber } from '@/shared/utils/isNumber'

export type LottoPurchaseAmountValidationResult = {
  isValid: boolean
  message?: string
}

export const validateLottoAmount = (
  amount: string,
): LottoPurchaseAmountValidationResult => {
  const amountAsNumber = parseInt(amount, 10)

  if (!isNumber(amountAsNumber) || amountAsNumber < LOTTO_PURCHASE_AMOUT_UNIT) {
    return {
      isValid: false,
      message: LOTTO_ERROR_MESSAGES.INVALID_MINIMUM_AMOUNT(
        LOTTO_PURCHASE_AMOUT_UNIT,
      ),
    }
  }

  if (amountAsNumber % LOTTO_PURCHASE_AMOUT_UNIT !== 0) {
    return {
      isValid: false,
      message: LOTTO_ERROR_MESSAGES.INVALID_AMOUNT_UNIT(
        LOTTO_PURCHASE_AMOUT_UNIT,
      ),
    }
  }

  return { isValid: true }
}
