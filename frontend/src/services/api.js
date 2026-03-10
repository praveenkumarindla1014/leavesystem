import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5002/api',
});

// Attach JWT token to every request if it exists
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Auth APIs
export const signupAPI = (data) => API.post('/auth/signup', data);
export const loginAPI = (data) => API.post('/auth/login', data);

// Leave APIs
export const applyLeaveAPI = (data) => API.post('/leaves', data);
export const getLeavesAPI = () => API.get('/leaves');
export const updateLeaveStatusAPI = (id, status) =>
  API.put(`/leaves/${id}/status`, { status });

export default API;
