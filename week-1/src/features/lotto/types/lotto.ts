import { LOTTO_RANKS } from '../constants/lotto'

export type LottoRankKey = keyof typeof LOTTO_RANKS
export type LottoRankValue = (typeof LOTTO_RANKS)[LottoRankKey]
export type LottoRankCountResult = Record<LottoRankValue, number>

export type LottoPurchaseAmountValidationResult = {
  isValid: boolean
  message?: string
}
