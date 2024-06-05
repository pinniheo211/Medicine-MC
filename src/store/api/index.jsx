import axios from 'axios';
import { getToken } from 'utils/auth';

export const NEXT_BASE_URL = 'http://localhost:3001/';
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
  register: (data) => API.post('api/user/register', data),
  login: (data) => API.post('api/user/login', data),
  getUser: () => API.get('api/user/current'),
  forgotPass: (email) => API.get(`api/user/forgotpassword?email=${email}`),
  resetPass: (data) => API.put(`api/user/resetpassword`, data),
  editUser: (data) => API.put('api/user/current', data)
};

export const productService = {
  getProduct: () => API.get(`api/product`),
  detailProduct: (id) => API.get(`api/product/${id}`),
  addNewProduct: (data) => API.post(`api/product/`, data),
  deleteProduct: (id) => API.delete(`api/product/${id}`),
  updateProduct: (data) => API.put(`api/product/${data.id}`, data.body)
};

export const warehouseService = {
  getWarehouse: () => API.get(`api/warehouse`),
  doCreateWarehouse: (data) => API.post('api/warehouse', data),
  deleteWarehouse: (id) => API.delete(`api/warehouse/${id}`),
  getDescriptionWarehouse: (id) => API.get(`api/warehouse/${id}`),
  updateWarehouse: (data) => API.put(`api/warehouse/update/${data.id}`, data.body),
  docreateImportProduct: (data) => API.post('/api/warehouse/import', data),
  docreateExportProduct: (data) => API.post('/api/warehouse/export', data),
  getImportProduct: () => API.get('/api/import-records'),
  getExportProduct: () => API.get('/api/export-records/'),
  getDescriptionExport: (id) => API.get(`api/export-records/${id}`),
  getDescriptionImport: (id) => API.get(`api/import-records/${id}`)
};

export const CategoryService = {
  getAllCategory: () => API.get(`api/productcategory`)
};

export const BrandService = {
  getAllBrand: () => API.get('api/brand')
};
