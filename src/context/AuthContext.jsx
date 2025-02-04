import { createContext, useEffect, useState, useContext } from "react";
import { decryptData, encryptData } from "../utils/encryptation";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const decryptedUser = decryptData(storedUser);
      setUser(decryptedUser);
    }
    setLoading(false);
  }, []);

  const login = (role) => {
    const userData = { role };
    setUser(userData);
    const encryptedUser = encryptData(userData);
    localStorage.setItem("user", encryptedUser);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};