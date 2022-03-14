import { FormEvent, useContext, useState } from 'react'
import styles from './index.module.sass'

import PersonRequest from '$api/requests/Person'
import { dateNumberToUTCString, dateStringToNumber } from '$root/util/dateStringConverter'
import { PersonData } from '$interfaces/PersonData'
import { PopupMessageContext } from '$root/providers/PopupMessageProvider'

import Button from '$components/Button'
import DeletionConfirmation from '../DeletionConfirmation'

const PersonView = (props: { data?: PersonData, closeView: () => void }) => {
  const { data, closeView } = props
  if(!data) return <><p>Dados inválidos!</p></>

  const id = data.id
  const [name, setName] = useState(data.name)
  const [birthday, setBirthday] = useState(data.birthday)
  const [phone_number, setPhone_number] = useState(data.phone_number)
  const [email, setEmail] = useState(data.email)
  const [country, setCountry] = useState(data.country)
  const [city, setCity] = useState(data.city)

  const { dispatchPopupMessages } = useContext(PopupMessageContext)

  const editPerson = async (event: FormEvent) => {
    event.preventDefault()
    closeView()
    try {
      dispatchPopupMessages({ type: 'ADD', message: { text: `Atualizando os dados de ${name}...`, theme: 'info' } })
      const response = await PersonRequest.update(id, { name, birthday, phone_number, email, country, city })
      if(response.status === 200) dispatchPopupMessages({ type: 'ADD', message: { text: `Dados de ${name} atualizados`, theme: 'confirm' } })
      else if(response.status === 422) dispatchPopupMessages({ type: 'ADD', message: { text: 'Parece que há algum tipo de erro no formulário', theme: 'warning' } })
      else dispatchPopupMessages({ type: 'ADD', message: { text: 'Não foi possível atualizar os dados', theme: 'danger' } })
    }
    catch (err) {
      dispatchPopupMessages({ type: 'ADD', message: { text: 'Não foi possível se conectar ao servidor', theme: 'danger' } })
    }
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
            value={phone_number}
            onChange={(event) => setPhone_number(event.currentTarget.value)}
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