import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
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

export const registerUser = async (userDetails) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/user/register`, userDetails);
  return response.data;
};

// export const fetchAppointments = () => {
//   return axios.get(`${import.meta.env.VITE_API_URL}/user/getappointments`, {
//     headers: {
//     'Content-Type': 'application/json;charset=utf-8',
//     Authorization: `Bearer ${localStorage.getItem('authToken')}` // ⬅️ Also updated here
//     }
//   });
// };
export const fetchAppointments = async() => {
   const response = await apiClient.get('/user/getappointments');
    return response.data;
};

export const getDoctorList = async() => {
    return await apiClient.get('/appointment/getalldoctors');
}
export const bookAppointment = async(payload) => {
    return await apiClient.post('/appointment/book',payload);
}