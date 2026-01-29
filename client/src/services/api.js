/**
 * ============================================
 * SERVICIOS API - ESCALABLE
 * ============================================
 * Centraliza todas las llamadas a la API
 * Añade nuevos servicios conforme crezca el proyecto
 */

import axios from 'axios';

// ==================== CONFIGURACIÓN BASE ====================
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 segundos
});

// ==================== INTERCEPTORES ====================
// Request: agregar token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response: manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Token expirado o inválido
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      if (window.location.pathname.startsWith('/admin') && 
          !window.location.pathname.includes('/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// ==================== HELPER PARA FORMDATA ====================
const createFormData = (data, fileField = null, file = null) => {
  const formData = new FormData();
  
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined && data[key] !== null) {
      if (Array.isArray(data[key])) {
        formData.append(key, data[key].join(','));
      } else if (typeof data[key] === 'object') {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    }
  });

  if (fileField && file) {
    formData.append(fileField, file);
  }

  return formData;
};

// ==================== AUTH API ====================
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  me: () => api.get('/auth/me'),
  changePassword: (data) => api.put('/auth/password', data),
  logout: () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  }
};

// ==================== PROFILE API ====================
export const profileAPI = {
  get: () => api.get('/profile'),
  update: (data) => api.put('/profile', data),
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post('/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  uploadResume: (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    return api.post('/profile/resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
};

// ==================== PROJECTS API ====================
export const projectsAPI = {
  getAll: (params) => api.get('/projects', { params }),
  getAllAdmin: () => api.get('/projects/all'),
  getOne: (id) => api.get(`/projects/${id}`),
  create: (data, image) => {
    const formData = createFormData(data, 'image', image);
    return api.post('/projects', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  update: (id, data, image) => {
    const formData = createFormData(data, 'image', image);
    return api.put(`/projects/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  delete: (id) => api.delete(`/projects/${id}`),
  reorder: (orderedIds) => api.put('/projects/reorder', { orderedIds })
};

// ==================== SKILLS API ====================
export const skillsAPI = {
  getAll: (params) => api.get('/skills', { params }),
  getAllAdmin: () => api.get('/skills/all'),
  getByCategory: (category) => api.get('/skills', { params: { category } }),
  create: (data) => api.post('/skills', data),
  update: (id, data) => api.put(`/skills/${id}`, data),
  delete: (id) => api.delete(`/skills/${id}`),
  createBulk: (skills) => api.post('/skills/bulk', { skills }),
  reorder: (orderedIds) => api.put('/skills/reorder', { orderedIds })
};

// ==================== EXPERIENCE API ====================
export const experienceAPI = {
  getAll: () => api.get('/experience'),
  getAllAdmin: () => api.get('/experience/all'),
  create: (data) => api.post('/experience', data),
  update: (id, data) => api.put(`/experience/${id}`, data),
  delete: (id) => api.delete(`/experience/${id}`)
};

// ==================== EDUCATION API ====================
export const educationAPI = {
  getAll: () => api.get('/education'),
  getAllAdmin: () => api.get('/education/all'),
  create: (data) => api.post('/education', data),
  update: (id, data) => api.put(`/education/${id}`, data),
  delete: (id) => api.delete(`/education/${id}`)
};

// ==================== CERTIFICATIONS API ====================
export const certificationsAPI = {
  getAll: (params) => api.get('/certifications', { params }),
  getAllAdmin: () => api.get('/certifications/all'),
  create: (data, image) => {
    const formData = createFormData(data, 'image', image);
    return api.post('/certifications', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  update: (id, data, image) => {
    const formData = createFormData(data, 'image', image);
    return api.put(`/certifications/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  delete: (id) => api.delete(`/certifications/${id}`)
};

// ==================== TESTIMONIALS API ====================
export const testimonialsAPI = {
  getAll: (params) => api.get('/testimonials', { params }),
  getAllAdmin: () => api.get('/testimonials/all'),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`)
};

// ==================== MESSAGES API ====================
export const messagesAPI = {
  getAll: (params) => api.get('/messages', { params }),
  send: (data) => api.post('/messages', data),
  getOne: (id) => api.get(`/messages/${id}`),
  markRead: (id) => api.put(`/messages/${id}/read`),
  archive: (id) => api.put(`/messages/${id}/archive`),
  delete: (id) => api.delete(`/messages/${id}`),
  getStats: () => api.get('/messages/stats/count')
};

// ==================== SETTINGS API ====================
export const settingsAPI = {
  get: () => api.get('/settings'),
  getConstants: () => api.get('/settings/constants'),
  update: (data) => api.put('/settings', data),
  updateSections: (sections) => api.put('/settings/sections', sections),
  updateTheme: (theme) => api.put('/settings/theme', theme)
};

// ==================== UPLOAD API ====================
export const uploadAPI = {
  image: (file, folder = 'general') => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);
    return api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  document: (file) => {
    const formData = new FormData();
    formData.append('document', file);
    return api.post('/upload/document', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  delete: (filename) => api.delete(`/upload/${filename}`)
};

// ==================== ANALYTICS API (futuro) ====================
export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getVisits: (params) => api.get('/analytics/visits', { params }),
  trackEvent: (event) => api.post('/analytics/event', event)
};

// ==================== EXPORT DEFAULT ====================
export default api;
