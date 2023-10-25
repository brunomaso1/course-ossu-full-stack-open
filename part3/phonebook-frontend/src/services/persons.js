import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl).then(response => response.data)
const create = newPerson => axios.post(baseUrl, newPerson).then(response => response.data)
const eliminate = id => axios.delete(baseUrl + `/${id}`)
const update = updatePerson => axios.put(baseUrl + `/${updatePerson.id}`, updatePerson)

const persons = { getAll, create, eliminate, update }

export default persons