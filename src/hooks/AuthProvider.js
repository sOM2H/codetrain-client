import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(localStorage.getItem("userData") || "");
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const loginAction = async (data) => {

    try {
      const response = await axios.post('http://localhost:3000/auth/sign_in', data);

      setData(response.data.data);
      setToken(response.headers['access-token']);
      localStorage.setItem("userData", response.data.data);
      localStorage.setItem("site", response.headers['access-token']);
      navigate("/profile");
      return;
    } catch (error) {
      throw new Error(error);
    }
  };

  const signupAction = async (data) => {

    try {
      const response = await axios.post('http://localhost:3000/auth', data);

      setData(response.data.data);
      setToken(response.headers['access-token']);
      localStorage.setItem("userData", response.data.data);
      localStorage.setItem("site", response.headers['access-token']);
      navigate("/profile");
      return;
    } catch (error) {
      throw new Error(error);
    }
  };

  const logOut = () => {
    setData(null);
    setToken("");
    localStorage.removeItem("userData");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, data, loginAction, signupAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
