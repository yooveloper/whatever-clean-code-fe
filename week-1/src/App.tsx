import { useState } from 'react'
import styles from './App.module.scss'
import Input from '@/shared/components/input/Input'
import Button from '@/shared/components/button/Button'

type ResultsCount = {
  '1등': number
  '2등': number
  '3등': number
  '4등': number
  '5등': number
  꽝: number
}

function App() {
  const AMOUNT_UNIT = 1000
  const LOTTO_NUMBER_COUNT = 6
  const WINNING_NUMBER_COUNT = 7

  const initialState = {
    amount: '',
    lottoNumbers: [] as number[][],
    errorMessage: '',
    winningNumbers: [] as number[],
    bonusNumber: null as number | null,
    resultsCount: {
      '1등': 0,
      '2등': 0,
      '3등': 0,
      '4등': 0,
      '5등': 0,
      꽝: 0,
    } as ResultsCount,
  }

  const [state, setState] = useState(initialState)

  const generateNumbers = (count: number): number[] => {
    const numbers: Set<number> = new Set()

    while (numbers.size < count) {
      numbers.add(Math.floor(Math.random() * 45) + 1)
    }

    return Array.from(numbers)
  }

  const validateAmount = (amount: string): string | null => {
    const parsedAmount = parseInt(amount, 10)

    if (!amount || isNaN(parsedAmount) || parsedAmount < AMOUNT_UNIT) {
      return '최소 1,000원 이상 입력해주세요.'
    }

    if (parsedAmount % AMOUNT_UNIT !== 0) {
      return '1,000원 단위로 입력해주세요.'
    }

    return null
  }

  const handlePurchase = () => {
    const parsedAmount = parseInt(state.amount, 10)
    const validateError = validateAmount(state.amount)

    if (validateError) {
      setState(prev => ({ ...prev, errorMessage: validateError }))
      return
    }

    const ticketCount = Math.floor(parsedAmount / 1000)

    const newLottoNumbers: number[][] = Array.from(
      { length: ticketCount },
      () => generateNumbers(LOTTO_NUMBER_COUNT).sort((a, b) => a - b),
    )

    setState(prev => ({
      ...prev,
      lottoNumbers: [...prev.lottoNumbers, ...newLottoNumbers],
      errorMessage: '',
    }))
  }

  const getRank = (matchCount: number, isBonusMatched: boolean): string => {
    if (matchCount === 6) return '1등'
    if (matchCount === 5 && isBonusMatched) return '2등'
    if (matchCount === 5) return '3등'
    if (matchCount === 4) return '4등'
    if (matchCount === 3) return '5등'
    return '꽝'
  }

  const checkResults = () => {
    const newNumbers = generateNumbers(WINNING_NUMBER_COUNT)

    const winningNumbers = newNumbers
      .slice(0, WINNING_NUMBER_COUNT - 1)
      .sort((a, b) => a - b)

    const bonusNumber = newNumbers[WINNING_NUMBER_COUNT - 1]

    const results: ResultsCount = {
      '1등': 0,
      '2등': 0,
      '3등': 0,
      '4등': 0,
      '5등': 0,
      꽝: 0,
    }

    state.lottoNumbers.forEach(ticket => {
      const matchCount = ticket.filter(num =>
        winningNumbers.includes(num),
      ).length

      const isBonusMatched = ticket.includes(bonusNumber!)

      const rank = getRank(matchCount, isBonusMatched) as keyof ResultsCount

      results[rank] += 1
    })

    setState(prev => ({
      ...prev,
      winningNumbers,
      bonusNumber,
      resultsCount: results,
    }))
  }

  const handleReset = () => {
    setState(initialState)
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>로또 어플리케이션</h1>

      {/* 금액 입력 및 구매 */}
      <div className={styles.price_input_box}>
        <Input
          label="로또 구매 금액"
          placeholder="구매 금액을 입력해주세요."
          value={state.amount}
          onChange={e =>
            setState(prev => ({ ...prev, amount: e.target.value }))
          }
        />
        <Button onClick={handlePurchase}>구매</Button>
      </div>

      {/* 에러 메시지 */}
      {state.errorMessage && (
        <p className={styles.error_message}>{state.errorMessage}</p>
      )}

      {/* 구매한 로또 번호 */}
      {state.lottoNumbers.length > 0 && (
        <div className={styles.purchased_lotto_number_box}>
          <h2 className={styles.sub_title}>구매한 로또 번호</h2>
          <ul className={styles.lotto_list}>
            {state.lottoNumbers.map((numbers, index) => (
              <li key={index} className={styles.lotto_item}>
                {numbers.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}
      <Button onClick={checkResults}>결과 확인</Button>

      {/* 당첨 번호 */}
      {state.winningNumbers.length > 0 && (
        <div className={styles.winning_number_box}>
          <h2 className={styles.sub_title}>당첨 번호</h2>
          <p className={styles.winning_numbers}>
            {state.winningNumbers.join(', ')} +{' '}
            <span className={styles.bonus_number}>{state.bonusNumber}</span>
          </p>
        </div>
      )}

      {/* 당첨 결과 */}
      {state.winningNumbers.length > 0 && (
        <div className={styles.results_box}>
          <h2 className={styles.sub_title}>당첨 결과</h2>
          <ul className={styles.results_list}>
            {Object.entries(state.resultsCount).map(([rank, count]) => (
              <li key={rank} className={styles.result_item}>
                {rank}: {count}개
              </li>
            ))}
          </ul>
        </div>
      )}
      <Button onClick={handleReset}>처음부터 다시하기</Button>
    </main>
  )
}

export default App
