// axiosConfig.js or App.js
import axios from 'axios';

const axiosConfig = axios.create({
  // baseURL: 'https://off-ease.vercel.app', // adjust if needed
  baseURL: 'http://localhost:5000',
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
