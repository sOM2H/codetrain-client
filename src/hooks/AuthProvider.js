import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [id, setId] = useState(localStorage.getItem("userId") || null);
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || null);
  const [name, setName] = useState(localStorage.getItem("userName") || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();
  const loginAction = async (data) => {

    console.log(data);

    try {
      const response = await axios.post('http://localhost:3000/auth/sign_in', data);

      setId(response.data.data.id);
      setEmail(response.data.data.email);
      setName(response.data.data.name);
      setToken(response.headers['access-token']);
      localStorage.setItem("userId", response.data.data.id);
      localStorage.setItem("userEmail", response.data.data.email);
      localStorage.setItem("userName", response.data.data.name);
      localStorage.setItem("token", response.headers['access-token']);
      navigate('/dashboard', { replace: true });
      window.location.reload();

      return;
    } catch (error) {
      throw new Error(error);
    }
  };

  const signupAction = async (data) => {

    try {
      const response = await axios.post('http://localhost:3000/auth', data);

      setId(response.data.data.id);
      setEmail(response.data.data.email);
      setName(response.data.data.name);
      setToken(response.headers['access-token']);
      localStorage.setItem("userId", response.data.data.id);
      localStorage.setItem("userEmail", response.data.data.email);
      localStorage.setItem("userName", response.data.data.name);
      localStorage.setItem("token", response.headers['access-token']);
      navigate('/dashboard', { replace: true });
      window.location.reload();

      return;
    } catch (error) {
      throw new Error(error);
    }
  };

  const logOut = () => {
    setId(null);
    setEmail(null);
    setName(null);
    setToken(null);
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, id, email, name, loginAction, signupAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
