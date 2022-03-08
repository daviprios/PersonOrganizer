import PersonRequest from '$api/requests/Person'
import { FormEvent, Reducer, useReducer } from 'react'

interface PersonState {
  name: string,
  birthday: number,
  phoneNumber: string,
  email: string,
  country?: string,
  city?: string,
}

interface PersonDispatchAction {
  type: 'SET_NAME' | 'SET_BIRTHDAY' | 'SET_PHONE_NUMBER' | 'SET_EMAIL' | 'SET_COUNTRY' | 'SET_CITY'
  payload: number | string
}

const personReducer = (state: PersonState, action: PersonDispatchAction): PersonState => {
  const { type, payload } = action

  switch(type){
    case 'SET_NAME':
      return { ...state, name: String(payload) }
    case 'SET_BIRTHDAY':
      return { ...state, birthday: Number(payload) }
    case 'SET_PHONE_NUMBER':
      return { ...state, phoneNumber: String(payload) }
    case 'SET_EMAIL':
      return { ...state, email: String(payload) }
    case 'SET_COUNTRY':
      return { ...state, country: String(payload) }
    case 'SET_CITY':
      return { ...state, city: String(payload) }
    default:
      throw new Error('Unexistent action type')
  }
}

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

const PersonForm = () => {
  const [state, dispatch] = useReducer<Reducer<PersonState, PersonDispatchAction>>(personReducer, {
    name: '',
    birthday: Date.now(),
    phoneNumber: '',
    email: '',
    country: '',
    city: '',
  })

  const createPerson = async (event: FormEvent) => {
    event.preventDefault()
    const { phoneNumber, ...rest } = state
    const response = await PersonRequest.create({ ...rest, phone_number: phoneNumber })
  }

  return (
    <form onSubmit={createPerson}>
          <label>
            Nome
            <input placeholder='Nome da pessoa'
              type='text'
              value={state.name}
              onChange={(event) => dispatch({ type: 'SET_NAME', payload: event.currentTarget.value })}
            />
          </label>
          <label>
            Data de nascimento
            <input placeholder='2020-05-25'
              type='date'
              value={dateNumberToString(state.birthday)}
              onChange={(event) => dispatch({ type: 'SET_BIRTHDAY', payload: dateStringToNumber(event.currentTarget.value) })}
            />
          </label>
          <label>
            Telefone
            <input placeholder='71987654321'
              type='tel'
              value={state.phoneNumber}
              pattern='[1-9]{2}9[0-9]{8}'
              onChange={(event) => dispatch({ type: 'SET_PHONE_NUMBER', payload: event.currentTarget.value })}
            />
          </label>
          <label>
            Email
            <input placeholder='email@email.com'
              type='email'
              value={state.email}
              onChange={(event) => dispatch({ type: 'SET_EMAIL', payload: event.currentTarget.value })}
            />
          </label>
          <label>
            País
            <input placeholder='Brasil'
              type='text'
              value={state.country}
              onChange={(event) => dispatch({ type: 'SET_COUNTRY', payload: event.currentTarget.value })}
            />
          </label>
          <label>
            Cidade
            <input placeholder='Salvador'
              type='text'
              value={state.city}
              onChange={(event) => dispatch({ type: 'SET_CITY', payload: event.currentTarget.value })}
            />
          </label>
          <button type='submit'>Cadastrar Pessoa</button>
        </form>
  )
}

export default PersonForm