// File: frontend/src/services/api.js

import axios from 'axios';

// Buat instance Axios
const apiClient = axios.create({
  // Ambil URL backend dari environment variables, dengan fallback ke URL development
  // PERBAIKAN: Hapus format markdown dan gunakan string URL biasa.
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://callcenter-scorecard.test/api',
  // Penting untuk otentikasi berbasis cookie dengan Sanctum
  withCredentials: true, 
});

// Interceptor untuk Request
// Ini akan menambahkan token ke setiap request secara otomatis
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Interceptor untuk Response (untuk error handling global)
apiClient.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    // Handle unauthenticated error, misalnya redirect ke login
    localStorage.removeItem('auth_token');
    // Di sini kita bisa memanggil fungsi logout dari AuthContext jika diperlukan
    // window.location.href = '/login'; // Hindari ini, gunakan navigate dari React Router
  }
  return Promise.reject(error);
});

export default apiClient;
