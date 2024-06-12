import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.headers['access-token']) {
      localStorage.setItem('accessToken', response.headers['access-token']);
      localStorage.setItem('client', response.headers['client']);
      localStorage.setItem('expiry', response.headers['expiry']);
      localStorage.setItem('uid', response.headers['uid']);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.post('http://localhost:3000/auth/refresh', {
          'access-token': localStorage.getItem('accessToken'),
          'client': localStorage.getItem('client'),
          'expiry': localStorage.getItem('expiry'),
          'uid': localStorage.getItem('uid'),
        });

        localStorage.setItem('accessToken', refreshResponse.headers['access-token']);
        localStorage.setItem('client', refreshResponse.headers['client']);
        localStorage.setItem('expiry', refreshResponse.headers['expiry']);
        localStorage.setItem('uid', refreshResponse.headers['uid']);

        originalRequest.headers['access-token'] = refreshResponse.headers['access-token'];
        originalRequest.headers['client'] = refreshResponse.headers['client'];
        originalRequest.headers['expiry'] = refreshResponse.headers['expiry'];
        originalRequest.headers['uid'] = refreshResponse.headers['uid'];

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
