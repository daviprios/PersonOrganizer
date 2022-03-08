import { useState } from 'react'
import Button from '$components/Button'
import { PersonData } from '$interfaces/PersonData'

const PersonView = (props: { data?: PersonData }) => {
  const { data } = props
  if(!data) return <><p>Dados inválidos!</p></>

  const [name, setName] = useState(data.name)

  return (
    <>
      <form>
        <label>
          ID
          <input value={data.id}
            readOnly
          />
        </label>
        <label>
          Nome
          <input placeholder='José Silva'
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
          />
        </label>
        <Button type='submit' theme='confirm'>
          Editar
        </Button>
        <Button type='button' theme='danger'>
          Fechar
        </Button>
      </form>
    </>
  )
}

export default PersonView