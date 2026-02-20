import axios from 'axios';

// For Vercel deployment, use relative URLs (/api/...)
// For local development, use VITE_API_URL if provided
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const authService = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
  logout: () => api.post('/api/auth/logout'),
  getBalance: () => api.get('/api/account/balance'),
};

export default api;
