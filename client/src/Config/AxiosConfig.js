// axiosConfig.js or App.js
import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'http://localhost:5000', // adjust if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// ⏬ Add this at the end to apply stored token globally
const token = localStorage.getItem('token');
if (token) {
  axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axiosConfig;
