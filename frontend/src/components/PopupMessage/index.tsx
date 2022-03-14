import styles from './index.module.sass'

import IconCross from '$svgs/iconWrong.svg?component'

type messageTheme = 'confirm' | 'danger' | 'warning' | 'info'

const PopupMessage = (props: { message: string, theme?: messageTheme, close: () => void }) => {
  const { message, theme } = props
  
  return (
    <article className={`${styles.popupMessage} ${styles[theme || 'info']}`}>
      <IconCross onClick={() => close()}/>
      <p>
        {message}
      </p>
    </article>
  )
}

export default PopupMessage