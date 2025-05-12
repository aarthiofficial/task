import axios from 'axios';
const API_BASE = 'http://localhost:8080/api/tasks';
export const getAllTasks = () => axios.get(API_BASE);
export const getTaskById = (id) => axios.get(`${API_BASE}/${id}`);
export const createTask = (task) => axios.post(API_BASE, task);
export const updateTask = (id, task) => axios.put(`${API_BASE}/${id}`, task);
export const deleteTask = (id) => axios.delete(`${API_BASE}/${id}`);
export const searchTasks = (title) => axios.get(`${API_BASE}/search?title=${title}`);
