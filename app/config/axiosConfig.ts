import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { API_BASE_URL } from './env';


const axiosInstance = axios.create({
  baseURL: API_BASE_URL,    
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    },
    withCredentials: false,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let token: string | null = null;
    try {
      if (Platform.OS === 'web') {
        if (typeof localStorage !== 'undefined') {
          token = localStorage.getItem('session');
        }
      } else {
        token = await SecureStore.getItemAsync('session');
      }
    } catch (e) {
      // noop: if storage access fails, proceed without token
    }

    if (token) {
      (config.headers as any)['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default axiosInstance;