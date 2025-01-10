import styles from './LottoPage.module.scss'

import useLotto from '@/features/lotto/hooks/useLotto'

import LottoPurchaseBox from '@/features/lotto/components/LottoPurchaseBox'
import LottoPurchasedList from '@/features/lotto/components/LottoPurchasedList'
import Button from '@/shared/components/button/Button'
import LottoWinningResultList from '@/features/lotto/components/LottoWinningResultLIst'
import LottoRankCountResultList from '@/features/lotto/components/LottoRankCountResultList'

function LottoPage() {
  const {
    lottoPurchaseAmount,
    setLottoPurchaseAmount,
    lottoErrorMessage,
    handlePurchaseLotto,
    purchasedLottoTickets,
    winningLottoTicket,
    bonusLottoNumber,
    lottoRankCountResult,
    handleCheckResultWinningLotto,
    hasLottoWinningResult,
    hasLottoRankCountResult,
    handleResetLotto,
  } = useLotto()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>로또 애플리케이션</h1>
      <LottoPurchaseBox
        amount={lottoPurchaseAmount}
        onAmountChange={e => setLottoPurchaseAmount(e.target.value)}
        onPurchase={handlePurchaseLotto}
        errorMessage={lottoErrorMessage}
      />
      <LottoPurchasedList purchasedLottoTickets={purchasedLottoTickets} />
      <Button onClick={handleCheckResultWinningLotto}>결과 확인</Button>
      {hasLottoWinningResult && (
        <LottoWinningResultList
          winningLottoTicket={winningLottoTicket}
          bonusLottoNumber={bonusLottoNumber}
        />
      )}
      {hasLottoRankCountResult && (
        <LottoRankCountResultList lottoRankCountResult={lottoRankCountResult} />
      )}
      <Button onClick={handleResetLotto}>처음부터 다시하기</Button>
    </div>
  )
}

export default LottoPage
