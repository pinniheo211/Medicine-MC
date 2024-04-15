import axios from 'axios';
import { getToken } from 'utils/auth';

export const NEXT_BASE_URL = 'http://localhost:3000/';
const API = axios.create({
  baseURL: NEXT_BASE_URL
});

API.interceptors.request.use((req) => {
  const token = getToken();
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;

//auth

export const AuthService = {
  register: (data) => API.post('api/v1/auth/register', data),
  login: (data) => API.post('api/v1/auth/login', data),
  getUser: () => API.get('api/v1/user')
};

export const productService = {
  getProduct: () => API.get('api/v1/product')
};
