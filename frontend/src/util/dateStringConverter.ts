const dateStringToNumber = (date: string) => {
  const [year, month, day] = date.split('-')
  const newDate = new Date(Number(year), Number(month) - 1, Number(day))
  const timestamp = newDate.getTime()
  return timestamp
}

const dateNumberToUTCString = (date: number) => {
  const dateObject = new Date(date)
  const [year, month, day] = [ dateObject.getUTCFullYear(), dateObject.getUTCMonth(), dateObject.getUTCDate() ]
  const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  return dateString
}

export { dateStringToNumber, dateNumberToUTCString }