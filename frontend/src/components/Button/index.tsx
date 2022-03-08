import { HTMLAttributes } from 'react'
import styles from './index.module.sass'

interface Button extends HTMLAttributes<HTMLButtonElement> {
  theme?: 'default' | 'info' | 'confirm' | 'warning' | 'danger'
}

const Button = (props: Button ) => {
  const { className, theme, ...rest } = props

  const buttonStyle = styles[theme || 'default']

  return (
    <button className={`${buttonStyle} ${className}`} { ...rest }>
    </button>
  )
}

export default Button