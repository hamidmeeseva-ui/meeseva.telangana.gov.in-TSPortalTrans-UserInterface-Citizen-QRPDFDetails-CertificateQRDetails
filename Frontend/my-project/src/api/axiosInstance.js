import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // adjust to your backend URL
  withCredentials: true, // send cookies automatically
});

export default axiosInstance;