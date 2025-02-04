import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const systemAxios = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

const refreshToken = async () => {

  try {
    const response = await systemAxios.post("/users/refresh_token");
    const newAccessToken = response.data.access_token;

    return newAccessToken;
  } catch (error) {
    return null;
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("access_token");

    if (!token || isTokenExpired(token)) {
      token = await refreshToken();
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      localStorage.setItem("access_token", token);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } else {
        localStorage.removeItem("access_token");
        // window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
