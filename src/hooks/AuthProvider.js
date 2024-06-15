import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AuthContext = createContext();

let updateAuthStateGlobal;

const AuthProvider = ({ children }) => {
  const [id, setId] = useState(localStorage.getItem("userId") || "");
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");
  const [name, setName] = useState(localStorage.getItem("userName") || "");

  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || "");
  const [client, setClient] = useState(localStorage.getItem("client") || "");
  const [expiry, setExpiry] = useState(localStorage.getItem("expiry") || "");
  const [uid, setUid] = useState(localStorage.getItem("uid") || "");

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken && Date.now() / 1000 > parseInt(expiry, 10)) {
      logOut();
    }
  }, [accessToken, expiry]);

  const updateAuthState = (data) => {
    const { id, email, name, accessToken, client, expiry, uid } = data;

    setId(id);
    setEmail(email);
    setName(name);
    setAccessToken(accessToken);
    setClient(client);
    setExpiry(expiry);
    setUid(uid);

    localStorage.setItem("userId", id);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", name);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("client", client);
    localStorage.setItem("expiry", expiry);
    localStorage.setItem("uid", uid);
  };

  updateAuthStateGlobal = updateAuthState;

  const loginAction = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/sign_in', data);
      updateAuthState({
        id: response.data.data.id,
        email: response.data.data.email,
        name: response.data.data.name,
        accessToken: response.headers['access-token'],
        client: response.headers['client'],
        expiry: response.headers['expiry'],
        uid: response.headers['uid']
      });
      navigate('/dashboard', { replace: true });
      window.location.reload();
    } catch (error) {
      throw new Error(error);
    }
  };

  const signupAction = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/auth', data);
      updateAuthState({
        id: response.data.data.id,
        email: response.data.data.email,
        name: response.data.data.name,
        accessToken: response.headers['access-token'],
        client: response.headers['client'],
        expiry: response.headers['expiry'],
        uid: response.headers['uid']
      });
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
    updateAuthState({
      id: "",
      email: "",
      name: "",
      accessToken: "",
      client: "",
      expiry: "",
      uid: ""
    });
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

export { updateAuthStateGlobal };
export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
