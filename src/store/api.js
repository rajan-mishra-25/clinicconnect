import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  get(resource) {
    return apiClient.get(resource);
  },
  
  post(resource, data) {
    return apiClient.post(resource, data);
  },
  
  put(resource, data) {
    return apiClient.put(resource, data);
  },
  
  delete(resource) {
    return apiClient.delete(resource);
  },
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/user/login`, credentials);
  return response.data;
};

export const registerUser = async (credentials) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/user/register`, credentials);
  return response.data;
};

export const fetchAppointments = () => {
  return axios.get(`${import.meta.env.VITE_API_URL}/user/getappointments`); // Adjust the endpoint as necessary
};