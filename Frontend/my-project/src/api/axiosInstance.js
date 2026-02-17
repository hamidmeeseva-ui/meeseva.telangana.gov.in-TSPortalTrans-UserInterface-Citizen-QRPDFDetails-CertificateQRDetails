import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://meeseva-telangana-gov-in-tsportaltrans.onrender.com/api', // adjust to your backend URL
  withCredentials: true, // send cookies automatically
});

export default axiosInstance;