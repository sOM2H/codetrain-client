import axios from 'axios';
import { updateAuthStateGlobal } from '../hooks/AuthProvider';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.headers['access-token']) {
      const authData = {
        id: localStorage.getItem("userId"),
        email: localStorage.getItem("userEmail"),
        name: localStorage.getItem("userName"),
        accessToken: response.headers['access-token'],
        client: response.headers['client'],
        expiry: response.headers['expiry'],
        uid: response.headers['uid']
      };

      updateAuthStateGlobal(authData);
    }
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      window.location.replace("/login");
    } else {
      console.log(error);
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
