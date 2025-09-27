import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token si lo hubiera
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Servicios de Autenticación
export const authService = {
  login: (credentials) => api.post('/usuario/login', credentials),
  logout: () => api.post('/usuario/logout'),
};

// Servicios de Categorías
export const categoriesService = {
  getAll: () => api.get('/categorias'),
  getById: (id) => api.get(`/categorias/${id}`),
  create: (data) => api.post('/categorias', data),
  
  // Aquí cambiamos a FormData para poder enviar imagen y nombre juntos
  update: (id, formData) =>
    api.put(`/categorias/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  delete: (id) => api.delete(`/categorias/${id}`),
  getImage: (id) => api.get(`/categorias/${id}/imagen`, { responseType: 'blob' }),
  updateImage: (id, formData) =>
    api.patch(`/categorias/${id}/imagen`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

// Servicios de Productos
export const productsService = {
  getAll: () => api.get('/productos'),
  getById: (id) => api.get(`/productos/${id}`),
  create: (data) => api.post('/productos', data),
  update: (id, data) => api.put(`/productos/${id}`, data),
  delete: (id) => api.delete(`/productos/${id}`),
};

// Servicios de Marcas
export const brandsService = {
  getAll: () => api.get('/marcas'),
  create: (data) => api.post('/marcas', data),
  update: (id, formData) =>
    api.put(`/marcas/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) => api.delete(`/marcas/${id}`),
};


// Servicios de Unidades
export const unitsService = {
  getAll: () => api.get('/unidades'),
  create: (data) => api.post('/unidades', data),
  update: (id, data) => api.put(`/unidades/${id}`, data),
  delete: (id) => api.delete(`/unidades/${id}`),
};

export default api;
