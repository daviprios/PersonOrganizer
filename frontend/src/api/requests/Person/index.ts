import Connection from '$api/Connection'
import { PersonData } from '$interfaces/PersonData'
import { PersonRequestCreate, PersonRequestDelete, PersonRequestIndex, PersonRequestShow, PersonRequestUpdate } from '$interfaces/PersonRequestResponses'

class PersonRequest {
  private static requestPath = '/person'

  static async index () {
    return await Connection.get<PersonRequestIndex>(`${this.requestPath}`)
  }

  static async show (id: number) {
    return await Connection.get<PersonRequestShow>(`${this.requestPath}/${id}`)
  }

  static async create (data: PersonData) {
    return await Connection.post<PersonRequestCreate>(`${this.requestPath}`, data)
  }

  static async update (id: number, data: PersonData) {
    return await Connection.put<PersonRequestUpdate>(`${this.requestPath}/${id}`, data)
  }

  static async delete (id: number) {
    return await Connection.delete<PersonRequestDelete>(`${this.requestPath}/${id}`)
  }
}

export default PersonRequest