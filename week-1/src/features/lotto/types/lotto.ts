import { LOTTO_RANKS } from '../constants/lotto'

export type LottoRankKey = keyof typeof LOTTO_RANKS
export type LottoRankValue = (typeof LOTTO_RANKS)[LottoRankKey]
export type LottoRankResults = Record<LottoRankValue, number>
