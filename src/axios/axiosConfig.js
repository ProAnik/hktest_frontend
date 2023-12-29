// resources/js/axios/axiosConfig.js

import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // You can customize this as needed
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default instance;
