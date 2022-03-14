import { FormEvent, useContext, useState } from 'react'
import styles from './index.module.sass'

import { dateNumberToUTCString, dateStringToNumber } from '$root/util/dateStringConverter'

import PersonRequest from '$api/requests/Person'
import Button from '$components/Button'

import { PopupMessageContext } from '$root/providers/PopupMessageProvider'

const Add = () => {
  const [name, setName] = useState('')
  const [birthday, setBirthday] = useState(Date.now())
  const [phone_number, setPhone_number] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')

  const { dispatchPopupMessages } = useContext(PopupMessageContext)

  const createPerson = async (event: FormEvent) => {
    event.preventDefault()
    dispatchPopupMessages({ type: 'ADD', message: { text: 'Criando nova pessoa...', theme: 'info' } })
    try {
      const response = await PersonRequest.create({ name, birthday, phone_number, email, country, city })
      if(response.status === 201) dispatchPopupMessages({ type: 'ADD', message: { text: 'Nova pessoa adicionada', theme: 'confirm' } })
      else if(response.status === 422) dispatchPopupMessages({ type: 'ADD', message: { text: 'Parece que há algum tipo de erro no formulário', theme: 'warning' } })
      else dispatchPopupMessages({ type: 'ADD', message: { text: 'Não foi possível adicionar uma nova pessoa', theme: 'danger' } })
    }
    catch (err) {
      dispatchPopupMessages({ type: 'ADD', message: { text: 'Não foi possível se conectar ao servidor', theme: 'danger' } })
    }
  }

  const reset = (event: FormEvent) => {
    event.preventDefault()
    setName('')
    setBirthday(0)
    setPhone_number('')
    setEmail('')
    setCountry('')
    setCity('')
  }

  return (
    <main className={styles.add}>
      <article>
        <form onSubmit={createPerson} onReset={reset}>
          <label>
            Nome
            <input placeholder='Nome da pessoa'
              type='text'
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
              pattern='[\w|\s]+'
              required
            />
          </label>
          <label>
            Data de nascimento
            <input placeholder={dateNumberToUTCString(new Date(0).getTime())}
              type='date'
              value={dateNumberToUTCString(birthday)}
              onChange={(event) => setBirthday(dateStringToNumber(event.currentTarget.value))}
              required
            />
          </label>
          <label>
            Telefone
            <input placeholder='71987654321'
              type='tel'
              value={phone_number}
              pattern='[1-9]{2}9[0-9]{8}'
              onChange={(event) => setPhone_number(event.currentTarget.value)}
              required
            />
          </label>
          <label>
            Email
            <input placeholder='email@email.com'
              type='email'
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              required
            />
          </label>
          <label>
            País
            <input placeholder='Brasil'
              type='text'
              value={country}
              onChange={(event) => setCountry(event.currentTarget.value)}
            />
          </label>
          <label>
            Cidade
            <input placeholder='Salvador'
              type='text'
              value={city}
              onChange={(event) => setCity(event.currentTarget.value)}
            />
          </label>
          <div>
            <Button type='submit' theme='confirm'>Cadastrar Pessoa</Button>
            <Button type='reset' theme='warning'>Limpar</Button>
          </div>
        </form>
      </article>
    </main>
  )
}

export default Add