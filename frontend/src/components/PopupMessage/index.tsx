import { useEffect } from 'react'
import styles from './index.module.sass'

import IconCross from '$svgs/iconWrong.svg?component'

type messageTheme = 'confirm' | 'danger' | 'warning' | 'info'

const PopupMessage = (props: { message: string, theme?: messageTheme, closeView: () => void }) => {
  const { message, theme, closeView } = props

  useEffect(() => {
    const timeout = setTimeout(() => closeView(), 10000);
    return () => clearTimeout(timeout)
  }, [])
  
  return (
    <article className={`${styles.popupMessage} ${styles[theme || 'info']}`}>
      <IconCross onClick={() => closeView()}/>
      <p>
        {message}
      </p>
    </article>
  )
}

export type { messageTheme }
export default PopupMessage