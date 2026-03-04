import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

// Product APIs
export const productAPI = {
  uploadProduct: (formData) => api.post('/products/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getUserProducts: () => api.get('/products'),
  getProduct: (id) => api.get(`/products/${id}`),
  updatePrice: (id, data) => api.put(`/products/${id}/price`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
};

// Pricing APIs
export const pricingAPI = {
  calculateProfit: (productId) => api.get(`/pricing/profit/${productId}`),
  getPriceFairness: (productId) => api.get(`/pricing/fairness/${productId}`),
  getPriceAnalytics: () => api.get('/pricing/analytics'),
};

export default api;
