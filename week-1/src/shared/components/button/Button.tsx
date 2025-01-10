import styles from './Button.module.scss'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {}

function Button({ ...rest }: Props) {
  return <button type="button" className={styles.container} {...rest} />
}

export default Button
