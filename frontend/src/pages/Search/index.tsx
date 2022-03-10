import { useCallback, useLayoutEffect, useState } from 'react'
import styles from './index.module.sass'

import { PersonData } from '$interfaces/PersonData'
import PersonItem from './PersonItem'
import PersonRequest from '$api/requests/Person'

import Button from '$components/Button'
import PersonView from './PersonView'

type SortOrder = 'asc' | 'desc'

const personSorter = (field: keyof PersonData = 'name', order: SortOrder = 'asc') => {
  return (a: PersonData, b: PersonData) => {
    const fieldA = a[field]
    const fieldB = b[field]

    const result = order === 'asc' ? 1 : -1
    if(fieldA === undefined || fieldB === undefined) return result

    if (typeof fieldA === 'number'){
      return (fieldA - Number(fieldB)) * result
    }
    if (typeof fieldA === 'string'){
      return result > 0
        ? fieldA.localeCompare(String(fieldB))
        : String(fieldB).localeCompare(fieldA)
    }
    return 0
  }
}

const Search = () => {
  const [persons, setPersons] = useState<PersonData[]>([
    {
      name: 'José',
      birthday: new Date(1983, 4, 21).getTime(),
      email: 'email@email.com',
      id: 4,
      phone_number: '7198765321',
      city: 'Salvador',
      country: 'Brasil'
    },
    {
      name: 'Dario',
      birthday: new Date(1973, 8, 2).getTime(),
      email: 'email@email.com',
      id: 3,
      phone_number: '7198765321',
      city: 'Salvador',
      country: 'Brasil'
    },
    {
      name: 'Rafaela',
      birthday: new Date(1999, 1, 28).getTime(),
      email: 'email@email.com',
      id: 1,
      phone_number: '7198765321',
      city: 'Salvador',
      country: 'Brasil'
    },
    {
      name: 'Júlia',
      birthday: new Date(1960, 12, 25).getTime(),
      email: 'email@email.com',
      id: 2,
      phone_number: '7198765321',
      city: 'Salvador',
      country: 'Brasil'
    },
  ])

  const fetchPersons = useCallback(async () => {
    const { status, data: { message, data } } = await PersonRequest.index()
    if(status === 200 && data) {
      setPersons(data)
    }
    console.log(message)
  }, [persons])

  useLayoutEffect(() => {
    if(persons.length < 1)
      fetchPersons()
      
    const p = [ ...persons ]
    setPersons(p.sort(personSorter('name', 'asc')))
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

  const [fieldSorted, setFieldSorted] = useState<[keyof PersonData, SortOrder]>(['name', 'asc'])
  const sortPersons = (field?: keyof PersonData) => {
    const p = [ ...persons ]

    let order: SortOrder = 'asc'
    if(field === fieldSorted[0]) {
      order = 'asc' === fieldSorted[1] ? 'desc' : 'asc'
    }

    setPersons(p.sort(personSorter(field, order)))
    setFieldSorted([field || 'name', order])
  }

  return (
    <main className={styles.searchPage}>
      <article>
        <div className={styles.search}>
          <input placeholder='Pesquisa...'
            value={''}
            onChange={() => {}}
          />
          <Button onClick={() => fetchPersons()}>
            Recarregar
          </Button>
        </div>
        <table className={styles.table}>
          <colgroup>
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th onClick={() => sortPersons('name')}>
                Nome {fieldSorted[0] === 'name' ? fieldSorted[1] === 'asc' ? 'V' : '^' : '' }
              </th>
              <th onClick={() => sortPersons('birthday')}>
                Data de Nascimento {fieldSorted[0] === 'birthday' ? fieldSorted[1] === 'asc' ? 'V' : '^' : '' }
              </th>
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
        <div className={styles.pageSelectorContainer}>
          <button onClick={() => {}}>{'<'}</button>
          <p>{10} - {20}</p>
          <button>{'>'}</button>
        </div>
      </article>
      <section className={styles.personViewContainer} style={{ display: showPersonDetails ? '' : 'none' }}>
        <article>
          <PersonView data={persons.find((person) => person.id === personDetailsID)} closeView={() => setShowPersonDetails(false)}/>
        </article>
      </section>
    </main>
  )
}

export default Search