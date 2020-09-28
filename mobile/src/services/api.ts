import axios from 'axios';

const api = axios.create({baseURL: 'https://ecoleta-davibss.herokuapp.com'});

export default api;