import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAll = (signal) => axios.get(baseUrl + '/all', signal).then(response => response.data);

const countryService = { getAll }

export default countryService