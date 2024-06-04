import axios from "axios";

const API_URL = "http://localhost:3000/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL, {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "sign_in", {
      username,
      password,
    })
    .then((response) => {
      if (response.headers['access-token']) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("access-token", JSON.stringify(response.headers['access-token'])); 
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("access-token");
};

export default {
  register,
  login,
  logout,
};
