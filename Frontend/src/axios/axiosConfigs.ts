import axios from 'axios';
import environment from '../environment';

const axiosClient = axios.create({
  baseURL: environment.apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});


axiosClient.interceptors.request.use(
  (config) => {
    const user_login = localStorage.getItem('user_login'); // Lấy token từ localStorage (nếu có)
    if (user_login) {
      const user = JSON.parse(user_login)
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
    } else {
      window.location.href = `${environment.apiUrl}/auth/login`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
