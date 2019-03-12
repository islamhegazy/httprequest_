import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})
instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

//as in index.js
//instance.interceptors.request.........
export default instance;