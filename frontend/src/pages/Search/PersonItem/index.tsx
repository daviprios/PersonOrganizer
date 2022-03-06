import { PersonData } from '$interfaces/PersonData'

const getMonthName = (month: number) => [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
][month]

const PersonItem = (props: { personData: PersonData, remove: () => void }) => {
  const { personData, remove } = props

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
      <td>{personData.id}</td>
      <td>{personData.name}</td>
      <td>{day}/{month}/{year}</td>
      <td>{personData.phone_number}</td>
      <td>{personData.email}</td>
      <td>{personData.country}</td>
      <td>{personData.city}</td>
      <td>
        <button onClick={() => remove()}>Delete</button>
      </td>
    </>
  )
}

export default PersonItem