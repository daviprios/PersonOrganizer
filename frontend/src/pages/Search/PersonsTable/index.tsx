import { useContext, useEffect, useState } from 'react'
import styles from '../index.module.sass'

import { PersonContext } from '$root/providers/PersonProvider'
import { PersonData } from '$interfaces/PersonData'
import PersonItem from '../PersonItem'

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

const PersonsTable = (props: { openDetails: (id: number) => void, filterKeyword: string }) => {
  const { openDetails, filterKeyword } = props
  const { persons, setPersons } = useContext(PersonContext)
  const [fieldSorted, setFieldSorted] = useState<[keyof PersonData, SortOrder]>(['name', 'asc'])

  useEffect(() => {
    setPersons([
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
  }, [])

  useEffect(() => {
    console.log(persons)
  }, [persons])

  const sortPersons = (field?: keyof PersonData, order?: SortOrder) => {
    const personsToSort = persons

    if(!order || field === fieldSorted[0]) {
      order = 'asc' === fieldSorted[1] ? 'desc' : 'asc'
    }

    setPersons(personsToSort.sort(personSorter(field, order)))
    setFieldSorted([field || 'name', order])
  }

  return (
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
        {
          persons.filter((person: PersonData) => {
            if(!filterKeyword) return true

            const names = person.name.toLocaleLowerCase().split(' ')
            for(let i = 0; i < names.length; i++){
              if(names[i].includes(filterKeyword.toLocaleLowerCase()))
                return true
            }
            return false
          })
          .map((person: PersonData) => {
            return (
              <tr key={person.id}>
                <PersonItem personData={person} view={() => openDetails(person.id)}/>
              </tr>
            )
          })
        }
      </tbody>
      
    </table>
  )
}

export default PersonsTable