import styles from './index.module.sass'

import PersonRequest from '$api/requests/Person'
import Button from '$components/Button'

const DeletionConfirmation = (props: { personToDeleteID: number, name: string, closeView: () => void }) => {
  const { personToDeleteID: id, name, closeView } = props
  
  const deletePerson = () => {
    PersonRequest.delete(id)
    closeView()
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