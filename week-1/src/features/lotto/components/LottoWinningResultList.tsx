import styles from './LottoWinningResultList.module.scss'

type LottoWinningResultListProps = {
  winningLottoTicket: number[]
  bonusLottoNumber: number
}

function LottoWinningResultList({
  winningLottoTicket,
  bonusLottoNumber,
}: LottoWinningResultListProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.sub_title}>당첨 번호</h2>
      {winningLottoTicket.length > 0 && (
        <div className={styles.winning_lotto_number}>
          <span>{winningLottoTicket.join(', ')}</span>
          <span> + </span>
          <span className={styles.bonus_lotto_number}>{bonusLottoNumber}</span>
        </div>
      )}
    </div>
  )
}

export default LottoWinningResultList
