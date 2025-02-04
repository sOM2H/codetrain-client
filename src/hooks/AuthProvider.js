import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosSetup";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/users/me")
      .then((response) => {
        setCurrentUser(response.data.user);
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
        setCurrentUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (data) => {
    try {
      const response = await axiosInstance.post("/users/sign_in", data);
      const user = response.data.user;
      setCurrentUser(user);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const signup = async (data) => {
    try {
      const response = await axiosInstance.post("/users", data);
      const user = response.data.user;
      setCurrentUser(user);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.delete("/users/sign_out", {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setCurrentUser(null);
      navigate("/login", { replace: true });
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout, loading, blabla }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
