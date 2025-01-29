import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const isTokenExpired = (token) => {
  if (!token) return true;
  const decoded = jwtDecode(token);
  return decoded.exp * 1000 < Date.now();
};

const refreshToken = async () => {
  try {
    const response = await axios.post('http://localhost:3000/users/refresh', {
      refresh_token: localStorage.getItem("refreshToken"),
    });

    const newAccessToken = response.data.access_token;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (error) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.replace("/login");
    throw error;
  }
};

axiosInstance.interceptors.request.use(async (config) => {
  let token = localStorage.getItem("accessToken");

  if (isTokenExpired(token)) {
    token = await refreshToken();
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       window.location.replace("/login");
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
