import { useCallback, useContext, useState } from 'react'
import styles from './index.module.sass'

import PersonRequest from '$api/requests/Person'
import PersonView from './PersonView'
import PersonsTable from './PersonsTable'
import { PersonContext } from '$root/providers/PersonProvider'

import Button from '$components/Button'

const Search = () => {
  const { persons, setPersons } = useContext(PersonContext)
  const fetchPersons = useCallback(async () => {
    const { status, data: { message, data } } = await PersonRequest.index()
    if(status === 200 && data) {
      setPersons(data)
    }
    console.log(message)
  }, [persons])

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
        <PersonsTable openDetails={openDetails}/>
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