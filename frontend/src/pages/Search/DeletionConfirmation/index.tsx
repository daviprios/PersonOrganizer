import { useContext } from 'react'
import styles from './index.module.sass'

import PersonRequest from '$api/requests/Person'
import Button from '$components/Button'
import { PopupMessageContext } from '$root/providers/PopupMessageProvider'

const DeletionConfirmation = (props: { personToDeleteID: number, name: string, closeView: () => void }) => {
  const { personToDeleteID: id, name, closeView } = props

  const { dispatchPopupMessages } = useContext(PopupMessageContext)
  
  const deletePerson = async () => {
    dispatchPopupMessages({ type: 'ADD', message: { text: `Deletando os dados de ${name}...`, theme: 'info' } })
    closeView()
    try {
      const response = await PersonRequest.delete(id)
      if(response.status === 200) dispatchPopupMessages({ type: 'ADD', message: { text: `Dados de ${name} deletados`, theme: 'confirm' } })
      else dispatchPopupMessages({ type: 'ADD', message: { text: `Não foi possível deletar os dados de ${name}`, theme: 'danger' } })
    }
    catch (err) {
      dispatchPopupMessages({ type: 'ADD', message: { text: 'Não foi possível se conectar ao servidor', theme: 'danger' } })
    }
  }

  return (
    <div className={styles.deleteConfirmation}>
      <article>
        <p>Tem certeza que deseja deletar os dados de <span>{name}</span></p>
        <div>
          <Button theme='confirm' onClick={() => deletePerson()}>
            Confirmar
          </Button>
          <Button theme='danger' onClick={() => closeView()}>
            Cancelar
          </Button>
        </div>
      </article>
    </div>
  )
}

export default DeletionConfirmation