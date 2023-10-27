import axios from 'axios';

export const iaAPI = axios.create({
    baseURL: 'http://192.168.100.175:8000'
});
