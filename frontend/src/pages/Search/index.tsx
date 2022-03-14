import { useContext, useState } from 'react'
import styles from './index.module.sass'

import { PersonContext } from '$root/providers/PersonProvider'

import PersonView from './PersonView'
import PersonsTable from './PersonsTable'
import PersonReloader from './PersonRealoader'
import { PopupMessageContext } from '$root/providers/PopupMessageProvider'

const Search = () => {
  const { persons } = useContext(PersonContext)

  const [showPersonDetails, setShowPersonDetails] = useState(false)
  const [personDetailsID, setPersonDetailsID] = useState(0)
  const openDetails = (id: number) => {
    setPersonDetailsID(id)
    setShowPersonDetails(true)
  }

  const [filterKeyword, setFilterKeyword] = useState('')

  const { dispatchPopupMessages } = useContext(PopupMessageContext)

  return (
    <main className={styles.searchPage}>
      <article>
        <PersonReloader/>
        <div className={styles.search}>
          <input placeholder='Pesquisa...'
            value={filterKeyword}
            onChange={(event) => setFilterKeyword(event.currentTarget.value)}
          />
        </div>
        <PersonsTable openDetails={openDetails} filterKeyword={filterKeyword}/>
      </article>
      {showPersonDetails
      ? <section className={styles.personViewContainer}>
          <article>
            <PersonView data={persons.find((person) => person.id === personDetailsID)} closeView={() => setShowPersonDetails(false)}/>
          </article>
        </section>
      : <></>}
    </main>
  )
}

export default Search