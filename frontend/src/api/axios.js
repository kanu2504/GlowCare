import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to log failing API calls with exact URL, status, and response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const failingUrl = error.config?.url
      ? `${error.config.baseURL || ''}${error.config.url}`
      : 'Unknown URL';
    const statusCode = error.response?.status || 'No Status Code';
    const errorResponse = error.response?.data || error.message;

    console.error('Failed API Call Details:', {
      url: failingUrl,
      status: statusCode,
      response: errorResponse,
    });

    return Promise.reject(error);
  }
);

export default api;

