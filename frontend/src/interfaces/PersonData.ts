interface PersonData {
  id: number,
  name: string,
  birthday: number,
  phone_number: string,
  email: string,
  country?: string,
  city?: string,
}

export type { PersonData }