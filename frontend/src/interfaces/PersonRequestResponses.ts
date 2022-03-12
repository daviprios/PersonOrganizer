import { PersonData } from './PersonData';

interface PersonRequestBase {
  message: string,
}

interface PersonRequestError extends PersonRequestBase {
}

interface PersonRequestErrorID extends PersonRequestError {
  id?: string | number
}

interface PersonRequestIndex extends PersonRequestBase{
  data?: PersonData[]
}

interface PersonRequestShow extends PersonRequestBase, PersonRequestErrorID{
  data?: PersonData
}

interface PersonRequestCreate extends PersonRequestBase{
}

interface PersonRequestUpdate extends PersonRequestBase, PersonRequestErrorID{
  amount?: number  
}

interface PersonRequestDelete extends PersonRequestBase, PersonRequestErrorID{
  amount?: number
}

interface PersonRequestData {
  name: string,
  birthday: number,
  phoneNumber: string,
  email: string,
  country?: string,
  city?: string,
}


export type { PersonRequestIndex, PersonRequestShow, PersonRequestCreate, PersonRequestUpdate, PersonRequestDelete, PersonRequestData }