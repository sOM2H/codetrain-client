import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use((response) => {
  if (response.headers['access-token']) {
    localStorage.setItem('accessToken', response.headers['access-token']);
    localStorage.setItem('client', response.headers['client']);
    localStorage.setItem('expiry', response.headers['expiry']);
    localStorage.setItem('uid', response.headers['uid']);
  }
  return response;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
