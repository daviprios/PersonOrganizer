import { FormEvent, useEffect, useState } from 'react'
import styles from './index.module.sass'

import PersonRequest from '$api/requests/Person'
import { dateNumberToUTCString, dateStringToNumber } from '$root/util/dateStringConverter'
import { PersonData } from '$interfaces/PersonData'

import Button from '$components/Button'
import DeletionConfirmation from '../DeletionConfirmation'

const PersonView = (props: { data?: PersonData, closeView: () => void }) => {
  const { data, closeView } = props
  if(!data) return <><p>Dados inválidos!</p></>

  useEffect(() => {
    setName(data.name)
  }, [data])

  const id = data.id
  const [name, setName] = useState(data.name)
  const [birthday, setBirthday] = useState(data.birthday)
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber)
  const [email, setEmail] = useState(data.email)
  const [country, setCountry] = useState(data.country)
  const [city, setCity] = useState(data.city)

  const editPerson = (event: FormEvent) => {
    event.preventDefault()
    PersonRequest.update(id, { name, birthday, phoneNumber, email, country, city })
    closeView()
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
        <label>
          Data de nascimento
          <input placeholder={dateNumberToUTCString(Date.now())}
            type='date'
            value={dateNumberToUTCString(birthday)}
            onChange={(event) => setBirthday(dateStringToNumber(event.currentTarget.value))}
          />
        </label>
        <label>
          Número de telefone
          <input placeholder='71912348765'
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.currentTarget.value)}
          />
        </label>
        <label>
          Email
          <input placeholder='email@email.com'
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
        </label>
        <label>
          Cidade
          <input placeholder='Salvador'
            value={city}
            onChange={(event) => setCity(event.currentTarget.value)}
          />
        </label>
        <label>
          País
          <input placeholder='Brasil'
            value={country}
            onChange={(event) => setCountry(event.currentTarget.value)}
          />
        </label>
        <div>
          <Button type='submit' theme='confirm' onClick={(e) => editPerson(e)}>
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