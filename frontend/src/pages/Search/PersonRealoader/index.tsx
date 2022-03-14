import { useCallback, useContext, useState } from 'react'
import styles from './index.module.sass'

import PersonRequest from '$api/requests/Person'
import { PersonContext } from '$root/providers/PersonProvider'

import Button from '$components/Button'
import IconReload from '../../../assets/svgs/iconReload.svg?component'
import IconCorrect from '../../../assets/svgs/iconCorrect.svg?component'
import IconWrong from '../../../assets/svgs/iconWrong.svg?component'

const PersonReloader = () => {
  const { persons, setPersons } = useContext(PersonContext)

  const fetchPersons = useCallback(async () => {
    setIsLoading(true)
    try {
      const { status, data: { data } } = await PersonRequest.index()
      if(status === 200 && data) {
        setPersons(data)
        setHadSuccess(true)
      }
      else setHadSuccess(false)
    }
    catch(err){
      console.log(err)
      setHadSuccess(false)
    }
    setIsLoading(false)
  }, [persons])

  const [isLoading, setIsLoading] = useState(false)
  const [hadSuccess, setHadSuccess] = useState(true)
  
  return (
    <div className={styles.reload}>
      <Button onClick={() => fetchPersons()}>
        Recarregar
      </Button>
      {isLoading ? <IconReload className={styles.reload}/> : hadSuccess ? <IconCorrect className={styles.correct}/> : <IconWrong className={styles.wrong}/>}
    </div>
  )
}

export default PersonReloader