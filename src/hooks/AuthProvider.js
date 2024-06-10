import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [id, setId] = useState(localStorage.getItem("userId") || null);
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || null);
  const [name, setName] = useState(localStorage.getItem("userName") || null);

  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null);
  const [client, setClient] = useState(localStorage.getItem("client") || null);
  const [expiry, setExpiry] = useState(localStorage.getItem("expiry") || null);
  const [uid, setUid]= useState(localStorage.getItem("uid") || null);

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken && Date.now() / 1000 > parseInt(expiry, 10)) {
      logOut();
    }
  }, [accessToken, expiry]);

  const loginAction = async (data) => {
    try { 
      const response = await axios.post('http://localhost:3000/auth/sign_in', data);

      setId(response.data.data.id);
      setEmail(response.data.data.email);
      setName(response.data.data.name);

      setAccessToken(response.headers['access-token']);
      setClient(response.headers['client']);
      setExpiry(response.headers['expiry']);
      setUid(response.headers['uid']);

      localStorage.setItem("userId", response.data.data.id);
      localStorage.setItem("userEmail", response.data.data.email);
      localStorage.setItem("userName", response.data.data.name);

      localStorage.setItem("accessToken", response.headers['access-token']);
      localStorage.setItem("client", response.headers['client']);
      localStorage.setItem("expiry", response.headers['expiry']);
      localStorage.setItem("uid", response.headers['uid']);

      navigate('/dashboard', { replace: true });
      window.location.reload();
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

      setAccessToken(response.headers['access-token']);
      setClient(response.headers['client']);
      setExpiry(response.headers['expiry']);
      setUid(response.headers['uid']);

      localStorage.setItem("userId", response.data.data.id);
      localStorage.setItem("userEmail", response.data.data.email);
      localStorage.setItem("userName", response.data.data.name);

      localStorage.setItem("accessToken", response.headers['access-token']);
      localStorage.setItem("client", response.headers['client']);
      localStorage.setItem("expiry", response.headers['expiry']);
      localStorage.setItem("uid", response.headers['uid']);

      navigate('/dashboard', { replace: true });
      window.location.reload();
    } catch (error) {
      throw new Error(error);
    }
  };

  const authHeaders = () => {
    return {
      'access-token': accessToken,
      'token-type': "Bearer",
      'client': client,
      'expiry': expiry,
      'uid': uid
    };
  };

  const logOut = () => {
    setId(null);
    setEmail(null);
    setName(null);

    setAccessToken(null);
    setClient(null);
    setExpiry(null);
    setUid(null);

    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    localStorage.removeItem("accessToken");
    localStorage.removeItem("client");
    localStorage.removeItem("expiry");
    localStorage.removeItem("uid");

    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ accessToken, client, expiry, uid, authHeaders,
                                   id, email, name,
                                   loginAction, signupAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
