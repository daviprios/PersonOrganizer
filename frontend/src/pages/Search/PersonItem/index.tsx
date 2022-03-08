import { PersonData } from '$interfaces/PersonData'

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
      <td>{day}/{month}/{year}</td>
      <td><button onClick={() => view()}>Detalhes</button></td>
    </>
  )
}

export default PersonItem