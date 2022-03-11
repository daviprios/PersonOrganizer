import { FormEvent, useEffect, useState } from 'react'
import styles from './index.module.sass'

import Button from '$components/Button'
import { PersonData } from '$interfaces/PersonData'

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

  const [name, setName] = useState(data.name)

  const editPerson = (event: FormEvent) => {
    event.preventDefault()
  }

  return (
    <>
      <form className={styles.form} onSubmit={editPerson}>
        <label>
          ID
          <input value={data.id}
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
          <Button type='button' theme='danger' onClick={() => closeView()}>
            Fechar
          </Button>
        </div>
      </form>
    </>
  )
}

export default PersonView