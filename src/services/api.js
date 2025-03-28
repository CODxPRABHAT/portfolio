import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => {
  const { email, password } = userData;
  return api.post('/auth/register', { email, password });
};
export const getCurrentUser = () => api.get('/auth/user');
export const updateUserProfile = (userData) => api.put('/auth/user', userData);

// Portfolio API calls
export const updateBio = (bio) => api.put('/portfolio/bio', { bio });

// Academic Details
export const getAcademicDetails = () => api.get('/portfolio/academic');
export const addAcademicDetail = (academicDetail) => api.post('/portfolio/academic', academicDetail);
export const updateAcademicDetail = (id, academicDetail) => api.put(`/portfolio/academic/${id}`, academicDetail);
export const deleteAcademicDetail = (id) => api.delete(`/portfolio/academic/${id}`);

// Projects
export const getProjects = () => api.get('/portfolio/project');
export const addProject = (project) => api.post('/portfolio/project', project);
export const updateProject = (id, project) => api.put(`/portfolio/project/${id}`, project);
export const deleteProject = (id) => api.delete(`/portfolio/project/${id}`);

// Contact API calls
export const submitContactForm = (formData) => api.post('/contact', formData);
export const getContactSubmissions = () => api.get('/contact');

export default api; 