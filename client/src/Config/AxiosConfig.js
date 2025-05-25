import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'http://localhost:5002', // ✅ use 5000 because your backend is working here
  withCredentials: true,           // ✅ allows cookies (if JWT is sent via cookie)
});

export default axiosConfig;
