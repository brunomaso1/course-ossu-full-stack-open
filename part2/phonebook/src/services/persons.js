import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => axios.get(baseUrl).then(response => response.data);

const create = newPerson => axios.post(baseUrl, newPerson).then(response => response.data);

const persons = { getAll, create }

export default persons