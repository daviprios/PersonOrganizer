import { FormEvent, useState } from 'react'
import styles from './index.module.sass'

import PersonRequest from '$api/requests/Person'
import Button from '$components/Button'

const dateStringToNumber = (date: string) => {
  const [year, month, day] = date.split('-')
  const newDate = new Date(Number(year), Number(month), Number(day))
  const timestamp = newDate.getTime()
  return timestamp
}

const dateNumberToString = (date: number) => {
  const dateObject = new Date(date)
  const [year, month, day] = [ dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate() ]
  const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  return dateString
}

const Add = () => {
  const [name, setName] = useState('')
  const [birthday, setBirthday] = useState(Date.now())
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')

  const createPerson = async (event: FormEvent) => {
    event.preventDefault()
    const response = await PersonRequest.create({ name, birthday, phoneNumber, email, country, city })
    console.log(response)
  }

  const reset = (event: FormEvent) => {
    event.preventDefault()
    setName('')
    setBirthday(Date.now())
    setPhoneNumber('')
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
            <input placeholder='2020-05-25'
              type='date'
              value={dateNumberToString(birthday)}
              onChange={(event) => setBirthday(dateStringToNumber(event.currentTarget.value))}
              required
            />
          </label>
          <label>
            Telefone
            <input placeholder='71987654321'
              type='tel'
              value={phoneNumber}
              pattern='[1-9]{2}9[0-9]{8}'
              onChange={(event) => setPhoneNumber(event.currentTarget.value)}
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