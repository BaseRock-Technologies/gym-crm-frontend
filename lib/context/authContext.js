"use client";

import { createContext, useState, useContext, useEffect } from 'react';
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // On initial load, retrieve the user from the cookies (if available)
    const userData = Cookies.get('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    // Whenever the user changes, store it in the cookies
    Cookies.set('user', JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
