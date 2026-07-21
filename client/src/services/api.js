 import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ecommerce-website-9h1j.onrender.com/api' // <-- Yahan aakhiri me /api zaroor lagayein
});

api.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  if (user) {
    const token = JSON.parse(user).token;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;