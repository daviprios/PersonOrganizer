import { useContext, useCallback, Dispatch, SetStateAction, useState } from 'react'
import styles from './index.module.sass'

import PersonRequest from '$api/requests/Person'
import { PersonContext } from '$root/providers/PersonProvider'

import Button from '$components/Button'

const PersonSearch = (props: { filter: { filterKeyword: string, setFilterKeyword: Dispatch<SetStateAction<string>> } }) => {
  const { filter: { filterKeyword, setFilterKeyword } } = props

  const { persons, setPersons } = useContext(PersonContext)
  const fetchPersons = useCallback(async () => {
    const { status, data: { message, data } } = await PersonRequest.index()
    if(status === 200 && data) {
      setPersons(data)
    }
    console.log(message)
  }, [persons])

  return (
    <div className={styles.search}>
      <input placeholder='Pesquisa...'
        value={filterKeyword}
        onChange={(event) => setFilterKeyword(event.currentTarget.value)}
      />
      <Button onClick={() => fetchPersons()}>
        Recarregar
      </Button>
    </div>
  )
}

export default PersonSearch