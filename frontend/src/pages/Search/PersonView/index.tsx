import { FormEvent, useEffect, useState } from 'react'
import styles from './index.module.sass'

import Button from '$components/Button'
import { PersonData } from '$interfaces/PersonData'
import DeletionConfirmation from '../DeletionConfirmation'

const PersonView = (props: { data?: PersonData, closeView: () => void }) => {
  const { data, closeView } = props
  if(!data) return <><p>Dados inválidos!</p></>

  /*
  const deletePerson = async (id: number) => {
    const { status, data: { message, amount, id: wrongID } } = await PersonRequest.delete(id)
    console.log(message)
    if(status === 200 && amount) console.log({ amountDeleted: amount })
    else console.log({ wrongID })
    setPersons(prev => prev.filter((person) => person.id !== id))
  }
  */

  useEffect(() => {
    setName(data.name)
  }, [data])

  const id = data.id
  const [name, setName] = useState(data.name)

  const editPerson = (event: FormEvent) => {
    event.preventDefault()
  }

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  return (
    <>
      <form className={styles.form} onSubmit={editPerson}>
        <div>
          <Button type='button' theme='danger' onClick={() => closeView()}>
            Fechar
          </Button>
        </div>
        <label>
          ID
          <input value={id}
            readOnly
          />
        </label>
        <label>
          Nome
          <input placeholder='José Silva'
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
          />
        </label>
        <div>
          <Button type='submit' theme='confirm'>
            Editar
          </Button>
          <Button type='button' theme='warning' onClick={() => setShowDeleteConfirmation(true)}>
            Excluir
          </Button>
        </div>
      </form>
      {showDeleteConfirmation
        ? <DeletionConfirmation personToDeleteID={id} name={name} closeView={() => setShowDeleteConfirmation(false)}/>
        : <></>}
    </>
  )
}

export default PersonView