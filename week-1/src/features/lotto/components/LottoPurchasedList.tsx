import styles from './LottoPurchasedList.module.scss'

type LottoPurchasedListProps = {
  purchasedLottoTickets: number[][]
}

function LottoPurchasedList({
  purchasedLottoTickets,
}: LottoPurchasedListProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.sub_title}>구매한 로또 번호</h2>
      <ul>
        {purchasedLottoTickets.map((ticket, index) => (
          <li key={index} className={styles.lotto_item}>
            {ticket.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LottoPurchasedList
