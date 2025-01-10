import styles from './LottoWinningResultList.module.scss'

import { type LottoRankCountResult } from '@/features/lotto/types/lotto'

type LottoWinningResultListProps = {
  lottoRankCountResult: LottoRankCountResult
}

function LottoRankCountResultList({
  lottoRankCountResult,
}: LottoWinningResultListProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.sub_title}>당첨 결과</h2>
      <ul>
        {Object.entries(lottoRankCountResult).map(([rank, count]) => (
          <li key={rank}>
            {rank}: {count}개
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LottoRankCountResultList
