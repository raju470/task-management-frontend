import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const setAuthHeader = (token) => ({
    headers: { Authorization: token },
});

export const register = (userData) => api.post('/auth/register', userData);

export const login = (userData) => api.post('/auth/login', userData);

export const getTasks = (token) => api.get('/tasks', setAuthHeader(token));

export const getTaskById = (taskId, token) => api.get(`/tasks/${taskId}`, setAuthHeader(token));

export const createTask = (taskData, token) => api.post('/tasks', taskData, setAuthHeader(token));

export const updateTask = (taskId, taskData, token) => api.put(`/tasks/${taskId}`, taskData, setAuthHeader(token));

export const deleteTask = (taskId, token) => api.delete(`/tasks/${taskId}`, setAuthHeader(token));

export default api;
