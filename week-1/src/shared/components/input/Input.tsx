import { InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

function Input({ label, ...rest }: Props) {
  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label} htmlFor={rest.id}>
          {label}
        </label>
      )}
      <input className={styles.input} type="number" {...rest} />
    </div>
  )
}

export default Input
