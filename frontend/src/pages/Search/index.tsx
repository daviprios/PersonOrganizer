import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import styles from './index.module.sass'

import { PersonData } from '$interfaces/PersonData'
import PersonItem from './PersonItem'
import PersonRequest from '$api/requests/Person'

import Button from '$components/Button'
import PersonView from './PersonView'
import { useOnClickOutside } from 'usehooks-ts'

const Search = () => {
  const [persons, setPersons] = useState<PersonData[]>([
    {
      name: 'Nome',
      birthday: Date.now(),
      email: 'email@email.com',
      id: 192837,
      phone_number: '7198765321',
      city: 'Salvador',
      country: 'Brasil'
    }
  ])

  const fetchPersons = useCallback(async () => {
    const { status, data: { message, data } } = await PersonRequest.index()
    if(status === 200 && data) setPersons(data)
    console.log(message)
  }, [persons])

  useLayoutEffect(() => {
    //if(persons.length < 1)
      fetchPersons()
  }, [])

  /*
  const deletePerson = async (id: number) => {
    const { status, data: { message, amount, id: wrongID } } = await PersonRequest.delete(id)
    console.log(message)
    if(status === 200 && amount) console.log({ amountDeleted: amount })
    else console.log({ wrongID })
    setPersons(prev => prev.filter((person) => person.id !== id))
  }
  */

  const [showPersonDetails, setShowPersonDetails] = useState(false)
  const [personDetailsID, setPersonDetailsID] = useState(0)
  const openDetails = (id: number) => {
    setPersonDetailsID(id)
    setShowPersonDetails(true)
  }

  const personViewContainer = useRef(null)
  useOnClickOutside(personViewContainer, () => setShowPersonDetails(false))

  return (
    <main>
      <article>
        <input placeholder='Pesquisa...'
          value={''}
          onChange={() => {}}
        />
        <Button onClick={() => fetchPersons()}>
          Recarregar
        </Button>
        <table>
          <colgroup>
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data de Nascimento</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {persons.map((person) => {
              return (
                <tr key={person.id}>
                  <PersonItem personData={person} view={() => openDetails(person.id)}/>
                </tr>
              )
            })}
          </tbody>
        </table>
      </article>
      <section style={{ display: showPersonDetails ? '' : 'none' }}>
        <article ref={personViewContainer}>
          <PersonView data={persons.find((person) => person.id === personDetailsID)}/>
        </article>
      </section>
    </main>
  )
}

export default Search