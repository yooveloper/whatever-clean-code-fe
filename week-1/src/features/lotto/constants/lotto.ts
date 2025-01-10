export const LOTTO_PURCHASE_AMOUT_UNIT = 1000 // 로또 구매 가격 단위
export const LOTTO_NUMBER_COUNT = 6 // 로또 번호 개수
export const LOTTO_WINNING_NUMBER_COUNT = 7 // 로또 당첨 번호 개수 (보너스 번호 포함)
export const LOTTO_NUMBER_MIN = 1 // 로또 번호 최소값
export const LOTTO_NUMBER_MAX = 45 // 로또 번호 최대값

export const LOTTO_RANKS = {
  FIRST: '1등',
  SECOND: '2등',
  THIRD: '3등',
  FOURTH: '4등',
  FIFTH: '5등',
  NONE: '꽝',
} as const // 로또 순위

export const LOTTO_ERROR_MESSAGES = {
  INVALID_MINIMUM_AMOUNT: (amount: number) =>
    `최소 ${amount}원 이상 입력해주세요.`,
  INVALID_AMOUNT_UNIT: (unit: number) => `${unit}원 단위로 입력해주세요.`,
} as const // 로또 에러 메시지
