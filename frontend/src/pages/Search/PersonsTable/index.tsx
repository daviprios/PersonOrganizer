import { useContext, useEffect, useState } from 'react'
import styles from './index.module.sass'

import { PersonContext } from '$root/providers/PersonProvider'
import { PersonData } from '$interfaces/PersonData'
import PersonItem from './PersonItem'
import personSorter, { SortOrder } from '$root/util/personSorter'

import IconCaretDown from '$svgs/iconCaretDown.svg?component'
import IconCaretUp from '$svgs/iconCaretUp.svg?component'

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
            Nome {fieldSorted[0] === 'name' ? fieldSorted[1] === 'asc' ? <IconCaretDown className={styles.caret}/> : <IconCaretUp className={styles.caret}/> : '' }
          </th>
          <th onClick={() => sortPersons('birthday')}>
            Data de Nascimento {fieldSorted[0] === 'birthday' ? fieldSorted[1] === 'asc' ? <IconCaretDown className={styles.caret}/> : <IconCaretUp className={styles.caret}/> : '' }
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