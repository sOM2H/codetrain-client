import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosSetup";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const [currentUser, setCurrentUser] = useState(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.user;
      } catch (error) {
        return null;
      }
    }
    return null;
  });

  const login = async (data) => {
    const response = await axiosInstance.post("/users/sign_in", data);
    const { access_token, refresh_token } = response.data;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    try {
      const decoded = jwtDecode(access_token);
      setCurrentUser(decoded.user || null);
    } catch (error) {
      setCurrentUser(null);
    }
    navigate('/dashboard', { replace: true });
    window.location.reload()
  };

  const signup = async (data) => {
    const response = await axiosInstance.post("/users", data);
    const { access_token, refresh_token } = response.data;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    try {
      const decoded = jwtDecode(access_token);
      setCurrentUser(decoded.user || null);
    } catch (error) {
      setCurrentUser(null);
    }
    navigate('/dashboard', { replace: true });
    window.location.reload()
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setCurrentUser(null);
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
