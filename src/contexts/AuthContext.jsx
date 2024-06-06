import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('access-token');
    if (user && token) {
      setCurrentUser(user);
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('user', userData);
    localStorage.setItem('access-token', token);
    setCurrentUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access-token');
    setCurrentUser(null);
  };

  const authHeader = ()  => {
    const accessToken = localStorage.getItem('access-token');
    if (accessToken) {
      return { Authorization: 'Bearer ' + accessToken };
    } else {
      return {};
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, authHeader }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
