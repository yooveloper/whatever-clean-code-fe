import { useState } from 'react'

import {
  LOTTO_NUMBER_COUNT,
  LOTTO_RANKS,
} from '@/features/lotto/constants/lotto'

import {
  calculateLottoTicketCount,
  calculateLottoTicketRank,
  generateLottoNumbers,
  generateWinningLottoNumbers,
  validateLottoAmount,
} from '@/features/lotto/utils/lotto'

const useLotto = () => {
  const [lottoPurchaseAmount, setLottoPurchaseAmount] = useState('')
  const [lottoErrorMessage, setLottoErrorMessage] = useState<
    string | undefined
  >('')
  const [purchasedLottoTickets, setPurchasedLottoTickets] = useState<
    number[][]
  >([])
  const [winningLottoTicket, setWinningLottoTicket] = useState<number[]>([])
  const [bonusLottoNumber, setBonusLottoNumber] = useState<number>(0)
  const [lottoRankCounts, setLottoRankCounts] = useState<
    Record<string, number>
  >({
    [LOTTO_RANKS.FIRST]: 0,
    [LOTTO_RANKS.SECOND]: 0,
    [LOTTO_RANKS.THIRD]: 0,
    [LOTTO_RANKS.FOURTH]: 0,
    [LOTTO_RANKS.FIFTH]: 0,
    [LOTTO_RANKS.NONE]: 0,
  })

  const handlePurchaseLotto = () => {
    const lottoPurchaseAmountAsNumber = parseInt(lottoPurchaseAmount, 10)
    const validationResult = validateLottoAmount(lottoPurchaseAmountAsNumber)

    if (!validationResult.isValid) {
      setLottoErrorMessage(validationResult.message)
      return
    }

    const purchasedLottoTicketCount = calculateLottoTicketCount(
      lottoPurchaseAmountAsNumber,
    )

    try {
      const newLottoNumbers = generateLottoNumbers(
        purchasedLottoTicketCount,
        LOTTO_NUMBER_COUNT,
      )
      setPurchasedLottoTickets(prev => [...prev, ...newLottoNumbers])
      setLottoErrorMessage('')
      setLottoPurchaseAmount('')
    } catch (error) {
      alert(error)
    }
  }

  const handleCheckResultWinningLotto = () => {
    const { winningLottoNumbers, bonusLottoNumber } =
      generateWinningLottoNumbers()

    setWinningLottoTicket(winningLottoNumbers)
    setBonusLottoNumber(bonusLottoNumber)

    const newLottoRankCount = { ...lottoRankCounts }
    purchasedLottoTickets.forEach(ticket => {
      const rank = calculateLottoTicketRank(
        ticket,
        winningLottoNumbers,
        bonusLottoNumber,
      )
      newLottoRankCount[rank]++
    })

    setLottoRankCounts(newLottoRankCount)
  }

  return {
    lottoPurchaseAmount,
    setLottoPurchaseAmount,
    lottoErrorMessage,
    handlePurchaseLotto,
    purchasedLottoTickets,
    winningLottoTicket,
    bonusLottoNumber,
    lottoRankCounts,
    handleCheckResultWinningLotto,
  }
}

export default useLotto
