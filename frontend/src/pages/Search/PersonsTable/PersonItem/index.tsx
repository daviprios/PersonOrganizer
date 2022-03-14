import { PersonData } from '$interfaces/PersonData'
import Button from '$components/Button'

const getMonthName = (month: number) => [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
][month]

const PersonItem = (props: { personData: PersonData, view: () => void }) => {
  const { personData, view } = props

  const birthdayDate = new Date(personData.birthday)
  const [
    year,
    month,
    day
  ] = [
    birthdayDate.getFullYear(),
    getMonthName(birthdayDate.getMonth()),
    birthdayDate.getDate()
  ]

  return (
    <>
      <td>{personData.name}</td>
      <td>{String(day).padStart(2, '0')}/{month}/{year}</td>
      <td><Button style={{ borderRadius: '0' }} theme='info' onClick={() => view()}>Detalhes</Button></td>
    </>
  )
}

export default PersonItem