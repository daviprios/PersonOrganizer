import axios from 'axios'

const Connection = axios.create({
  baseURL: String(import.meta.env['API_BASE_URL']) || 'localhost:8000',
})

export default Connection