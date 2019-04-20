import axios from 'axios';

export const apiAxios = axios.create({ baseURL: 'https://dev.askmirror.local:5001/api' });
