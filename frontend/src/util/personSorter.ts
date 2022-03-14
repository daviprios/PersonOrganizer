import { PersonData } from "$interfaces/PersonData"

type SortOrder = 'asc' | 'desc'

const personSorter = (field: keyof PersonData = 'name', order: SortOrder = 'asc') => {
  return (a: PersonData, b: PersonData) => {
    const fieldA = a[field]
    const fieldB = b[field]

    const result = order === 'asc' ? 1 : -1
    if(fieldA === undefined || fieldB === undefined) return result

    if (typeof fieldA === 'number'){
      return (fieldA - Number(fieldB)) * result
    }
    if (typeof fieldA === 'string'){
      return result > 0
        ? fieldA.localeCompare(String(fieldB))
        : String(fieldB).localeCompare(fieldA)
    }
    return 0
  }
}

export type { SortOrder }
export default personSorter