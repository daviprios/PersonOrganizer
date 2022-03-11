import { useContext, useState } from 'react'
import styles from './index.module.sass'

import { PersonContext } from '$root/providers/PersonProvider'

import PersonView from './PersonView'
import PersonsTable from './PersonsTable'
import PersonSearch from './PersonSearch'

const Search = () => {
  const { persons } = useContext(PersonContext)

  const [showPersonDetails, setShowPersonDetails] = useState(false)
  const [personDetailsID, setPersonDetailsID] = useState(0)
  const openDetails = (id: number) => {
    setPersonDetailsID(id)
    setShowPersonDetails(true)
  }

  const [filterKeyword, setFilterKeyword] = useState('')

  return (
    <main className={styles.searchPage}>
      <article>
        <PersonSearch filter={{ filterKeyword, setFilterKeyword }}/>
        <PersonsTable openDetails={openDetails} filterKeyword={filterKeyword}/>
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