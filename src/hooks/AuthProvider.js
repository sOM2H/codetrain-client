import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const AuthContext = createContext();

let updateAuthStateGlobal;

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || "");
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken") || "");

  const getUserFromToken = (token) => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return {
        id: decoded.id,
        login: decoded.login,
        full_name: decoded.full_name,
        role: decoded.roles[0]?.name,
        organization: decoded.organization,
        sub: decoded.sub,
        scp: decoded.scp,
        aud: decoded.aud,
        iat: decoded.iat,
        exp: decoded.exp,
        jti: decoded.jti,
      };
    } catch (e) {
      console.error("Invalid token", e);
      return null;
    }
  };

  const [currentUser, setCurrentUser] = useState(accessToken ? getUserFromToken(accessToken) : null);

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      const userData = getUserFromToken(accessToken);
      if (userData) {
        setCurrentUser(userData);
      }
    }
  }, [accessToken]);

  const updateAuthState = (data) => {
    const { accessToken, refreshToken } = data;

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    const userData = getUserFromToken(accessToken);
    setCurrentUser(userData);
  };

  updateAuthStateGlobal = updateAuthState;

  const authHeaders = () => {
    return {
      'Authorization': `Bearer ${accessToken}`,
    };
  };

  const loginAction = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/users/sign_in', data);
      updateAuthState({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
      });
      console.log(currentUser)
      navigate('/dashboard', { replace: true });
    } catch (error) {
      throw new Error(error);
    }
  };

  const signupAction = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/users', data);
      updateAuthState({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
      });
      navigate('/dashboard', { replace: true });
    } catch (error) {
      throw new Error(error);
    }
  };

  const logOut = () => {
    updateAuthState({
      accessToken: "",
      refreshToken: "",
    });
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{
      accessToken, refreshToken, authHeaders,
      currentUser, loginAction, signupAction, logOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export { updateAuthStateGlobal };
export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
