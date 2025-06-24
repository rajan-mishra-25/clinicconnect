import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://your-api-url.com/api', // Replace with your API base URL
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
  const response = await axios.post('/api/login', credentials);
  return response.data;
};