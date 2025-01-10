import styles from './LottoPage.module.scss'

import useLotto from '@/features/lotto/hooks/useLotto'

import LottoPurchaseBox from '@/features/lotto/components/LottoPurchaseBox'

function LottoPage() {
  const {
    lottoAmount,
    setLottoAmount,
    lottoErrorMessage,
    handlePurchaseLotto,
  } = useLotto()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>로또 애플리케이션</h1>
      <LottoPurchaseBox
        amount={lottoAmount}
        onAmountChange={e => setLottoAmount(e.target.value)}
        onPurchase={handlePurchaseLotto}
        errorMessage={lottoErrorMessage}
      />
      {/* <LottoPurchasedDisplay /> */}
      {/* <LottoResetButton /> */}
    </div>
  )
}

export default LottoPage
