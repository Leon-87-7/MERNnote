import axios from 'axios';
import Session from 'supertokens-auth-react/recipe/session';

const BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5001/api'
    : '/api';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Handle 401 responses (session expired)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Session expired, redirect to auth
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default api;
