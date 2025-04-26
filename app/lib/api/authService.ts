import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface UpdateProfileData {
  name?: string;
  email?: string;
  password?: string;
  currentPassword?: string;
}

interface ApiKeyData {
  service: string;
  key: string;
  isActive: boolean;
}

export const authService = {
  register: async (data: RegisterData) => {
    const response = await axiosInstance.post('/users/register', data);
    return response.data;
  },

  login: async (data: LoginData) => {
    const response = await axiosInstance.post('/users/login', data);
    return response.data;
  },

  getProfile: async () => {
    // Add token to request
    const token = localStorage.getItem('flowa_token');
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await axiosInstance.get('/users/profile');
    return response.data;
  },

  updateProfile: async (data: UpdateProfileData) => {
    const response = await axiosInstance.put('/users/profile', data);
    return response.data;
  },

  manageApiKeys: async (apiKeys: ApiKeyData[]) => {
    const response = await axiosInstance.put('/users/api-keys', { apiKeys });
    return response.data;
  },
};
