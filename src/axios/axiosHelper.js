// resources/js/axios/apiService.js

import axiosConfig from './axiosConfig';

export const fetchData = (url, params) => {
    return axiosConfig.get(url, { params });
};

export const postData = (url, data) => {
    return axiosConfig.post(url, data);
};

// Add more functions for different types of requests as needed
