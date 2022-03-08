import { useCallback, useLayoutEffect, useState } from 'react'
import styles from './index.module.sass'

import { PersonData } from '$interfaces/PersonData'
import PersonItem from './PersonItem'
import PersonRequest from '$api/requests/Person'

import Button from '$components/Button'

const Search = () => {
  const [persons, setPersons] = useState<PersonData[]>([])

  const fetchPersons = useCallback(async () => {
    const { status, data: { message, data } } = await PersonRequest.index()
    if(status === 200 && data) setPersons(data)
    console.log(message)
  }, [persons])

  useLayoutEffect(() => {
    if(persons.length < 1) fetchPersons()
  }, [])

  const deletePerson = async (id: number) => {
    const { status, data: { message, amount, id: wrongID } } = await PersonRequest.delete(id)
    console.log(message)
    if(status === 200 && amount) console.log({ amountDeleted: amount })
    else console.log({ wrongID })
    setPersons(prev => prev.filter((person) => person.id !== id))
  }

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
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Data de Nascimento</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>País</th>
              <th>Cidade</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {persons.map((person) => {
              return (
                <tr key={person.id}>
                  <PersonItem personData={person} remove={() => deletePerson(person.id)}/>
                </tr>
              )
            })}
          </tbody>
        </table>
      </article>
    </main>
  )
}

export default Search