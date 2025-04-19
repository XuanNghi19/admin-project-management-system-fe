import axios from 'axios'
import { environment } from '../environments/environments';

const token = localStorage.getItem('token');
const apiClient = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  baseURL :`${environment.apiUrl}/`,

});

export default apiClient;