    // File: frontend/src/services/api.js
    
    import axios from 'axios';
    
    // Buat instance Axios
    const apiClient = axios.create({
      // Ambil URL backend dari environment variables, dengan fallback ke URL development
      baseURL: import.meta.env.VITE_API_BASE_URL || '[http://callcenter-scorecard.test/api](http://callcenter-scorecard.test/api)',
      // Penting untuk otentikasi berbasis cookie dengan Sanctum
      withCredentials: true, 
    });
    
    // Interceptor untuk Request (akan kita gunakan nanti)
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
    
    // Interceptor untuk Response (akan kita gunakan nanti untuk error handling global)
    apiClient.interceptors.response.use(response => {
      return response;
    }, error => {
      if (error.response && error.response.status === 401) {
        // Handle unauthenticated error, misalnya redirect ke login
        localStorage.removeItem('auth_token');
        // window.location.href = '/login'; // Lakukan ini dengan React Router
      }
      return Promise.reject(error);
    });
    
    export default apiClient;
    
    