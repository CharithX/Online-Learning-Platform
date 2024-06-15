import React, { createContext, useContext, useState } from 'react';

// Create context
const AuthContext = createContext();

// Create context provider
export const AuthProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(null);

  const login = (token) => {
    setAdminToken(token);
    localStorage.setItem('adminToken', token);
  };

  const logout = () => {
    setAdminToken(null);
    localStorage.removeItem('adminToken');
  };

  return (
    <AuthContext.Provider value={{ adminToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
