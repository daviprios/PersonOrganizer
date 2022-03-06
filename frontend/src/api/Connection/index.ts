import axios from 'axios'

const version = '/api/v1'

const Connection = axios.create({
  baseURL: `${String(import.meta.env['API_BASE_URL'] || 'http://localhost:8000')}${version}`,
})

export default Connection