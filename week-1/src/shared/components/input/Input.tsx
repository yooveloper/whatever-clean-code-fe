import styles from './Input.module.scss'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

function Input({ label, value, onChange, ...rest }: Props) {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={styles.input}
        type="number"
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  )
}

export default Input
