const dateStringToNumber = (date: string) => {
  const [year, month, day] = date.split('-')
  const newDate = new Date(Number(year), Number(month) - 1, Number(day))
  const timestamp = newDate.getTime()
  return timestamp
}

const dateNumberToString = (date: number) => {
  const dateObject = new Date(date)
  const [year, month, day] = [ dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate() ]
  const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  return dateString
}

export { dateStringToNumber, dateNumberToString }