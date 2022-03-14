import { useContext } from 'react'
import styles from './index.module.sass'

import PopupMessage from '$components/PopupMessage'
import { PopupMessageContext } from '$root/providers/PopupMessageProvider'

const PopupManager = () => {
  const { popupMessages, dispatchPopupMessages } = useContext(PopupMessageContext)  

  return (
    <div className={styles.popupManager}>
      {popupMessages.messages.map((message) => {
        const { id, text, theme } = message
        return (
          <PopupMessage key={id} message={text} theme={theme} closeView={() => dispatchPopupMessages({ type: 'REMOVE', id })} />
        )
      })}
    </div>
  )
}

export default PopupManager