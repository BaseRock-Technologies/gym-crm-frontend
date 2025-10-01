"use client"; // 👈 must be at the very top

import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

// Define the shape of the auth context
interface AuthContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create context with undefined default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
