import { isNumber } from '@/shared/utils/isNumber'

import {
  LOTTO_ERROR_MESSAGES,
  LOTTO_NUMBER_COUNT,
  LOTTO_NUMBER_MAX,
  LOTTO_NUMBER_MIN,
  LOTTO_PURCHASE_AMOUT_UNIT,
  LOTTO_RANKS,
  LOTTO_WINNING_NUMBER_COUNT,
  LOTTO_WINNING_NUMBER_TICKET_COUNT,
} from '@/features/lotto/constants/lotto'

import { type LottoPurchaseAmountValidationResult } from '@/features/lotto/types/lotto'

import { generateRandomUniqueNumberSet } from '@/shared/utils/generateRandomSet'

export const validateLottoAmount = (
  amount: number,
): LottoPurchaseAmountValidationResult => {
  if (!isNumber(amount) || amount < LOTTO_PURCHASE_AMOUT_UNIT) {
    return {
      isValid: false,
      message: LOTTO_ERROR_MESSAGES.INVALID_MINIMUM_AMOUNT(
        LOTTO_PURCHASE_AMOUT_UNIT,
      ),
    }
  }

  if (amount % LOTTO_PURCHASE_AMOUT_UNIT !== 0) {
    return {
      isValid: false,
      message: LOTTO_ERROR_MESSAGES.INVALID_AMOUNT_UNIT(
        LOTTO_PURCHASE_AMOUT_UNIT,
      ),
    }
  }

  return { isValid: true }
}

export const calculateLottoTicketCount = (amount: number): number => {
  return amount / LOTTO_PURCHASE_AMOUT_UNIT
}

export const generateLottoNumbers = (
  lottoTicketCount: number,
  lottoNumberCount: number,
): number[][] => {
  const lottoNumberRange = { min: LOTTO_NUMBER_MIN, max: LOTTO_NUMBER_MAX }
  return Array.from({ length: lottoTicketCount }, () =>
    generateRandomUniqueNumberSet(lottoNumberCount, lottoNumberRange),
  )
}

export const generateWinningLottoNumbers = () => {
  const newWinningLottoNumbers = generateLottoNumbers(
    LOTTO_WINNING_NUMBER_TICKET_COUNT,
    LOTTO_WINNING_NUMBER_COUNT,
  )[0] // 7개 짜리 번호 1장 생성 (마지막 번호는 보너스 번호)

  const winningLottoNumbers = newWinningLottoNumbers.slice(
    0,
    LOTTO_NUMBER_COUNT,
  )
  const bonusLottoNumber = newWinningLottoNumbers[LOTTO_NUMBER_COUNT]

  return { winningLottoNumbers, bonusLottoNumber }
}

export const calculateLottoTicketRank = (
  ticket: number[],
  winningNumbers: number[],
  bonusNumber: number,
): string => {
  const matchedCount = ticket.filter(number =>
    winningNumbers.includes(number),
  ).length
  const isBonusMatched = ticket.includes(bonusNumber)

  if (matchedCount === 6) return LOTTO_RANKS.FIRST
  if (matchedCount === 5 && isBonusMatched) return LOTTO_RANKS.SECOND
  if (matchedCount === 5) return LOTTO_RANKS.THIRD
  if (matchedCount === 4) return LOTTO_RANKS.FOURTH
  if (matchedCount === 3) return LOTTO_RANKS.FIFTH
  return LOTTO_RANKS.NONE
}
