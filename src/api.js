import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/api', // Endereço do seu servidor backend
    withCredentials: true,
});

export default api;
