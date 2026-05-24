import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add authorization token to requests automatically
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to extract data and handle error messages centrally
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // If token is invalid or expired, optionally clear local storage and redirect
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized or token expired. Clearing session.');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    const message = error.response?.data?.message || error.message || 'API request failed';
    return Promise.reject(new Error(message));
  }
);

export const authAPI = {
  login: (credentials) => apiClient.post('/api/auth/login', credentials),
  register: (userData) => apiClient.post('/api/auth/register', userData),
};

export const carAPI = {
  getAll: () => apiClient.get('/api/cars'),
  getById: (id) => apiClient.get(`/api/cars/${id}`),
  create: (carData) => apiClient.post('/api/cars', carData),
  update: (id, carData) => apiClient.put(`/api/cars/${id}`, carData),
  delete: (id) => apiClient.delete(`/api/cars/${id}`),
};

export const bookingAPI = {
  getMyBookings: () => apiClient.get('/api/bookings/my-bookings'),
  getByUserId: (userId) => apiClient.get(`/api/bookings/user/${userId}`),
  create: (bookingData) => apiClient.post('/api/bookings', bookingData),
  cancel: (id) => apiClient.put(`/api/bookings/${id}/cancel`),
};

export default apiClient;
