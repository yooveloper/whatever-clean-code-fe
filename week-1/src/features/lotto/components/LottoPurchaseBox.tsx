import styles from './LottoPurchaseBox.module.scss'

import Input from '@/shared/components/input/Input'
import Button from '@/shared/components/button/Button'

type Props = {
  amount: string
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  errorMessage?: string
  onPurchase: () => void
}

function LottoPurchaseBox({
  amount,
  onAmountChange,
  errorMessage,
  onPurchase,
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.input_box}>
        <Input
          label="로또 구매 금액"
          placeholder="구매 금액을 입력해주세요."
          value={amount}
          onChange={onAmountChange}
        />
        <Button onClick={onPurchase}>구매</Button>
      </div>
      {errorMessage && <p className={styles.error_message}>{errorMessage}</p>}
    </div>
  )
}

export default LottoPurchaseBox
