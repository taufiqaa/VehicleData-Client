import axios from 'axios';

export const API = axios.create({
    baseURL: "http://localhost:4250/api/v1/",
});
