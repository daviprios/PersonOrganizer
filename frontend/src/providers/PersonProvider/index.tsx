import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { PersonData } from '$interfaces/PersonData'
import PersonRequest from '$api/requests/Person'

interface PersonContext {
  persons: PersonData[],
  setPersons: Dispatch<SetStateAction<PersonData[]>>
}

const PersonContext = createContext<PersonContext>({ persons: [], setPersons: () => {} })

const PersonProvider = (props: { children: ReactNode }) => {
  const { children } = props

  const [persons, setPersons] = useState<PersonData[]>([
    {
      name: 'José',
      birthday: new Date(1983, 4, 21).getTime(),
      email: 'email@email.com',
      id: 4,
      phoneNumber: '7198765321',
      city: 'Salvador',
      country: 'Brasil'
    },
  ])

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const { status, data: { message, data } } = await PersonRequest.index()
        if(status === 200 && data) setPersons(data)
        console.log(message)
      }
      catch(err: unknown){
        console.log(err)
      }
    }

    fetchPersons()
  }, [])

  return (
    <PersonContext.Provider value={{ persons, setPersons }}>
      {children}
    </PersonContext.Provider>
  )
}

export { PersonContext }
export default PersonProvider