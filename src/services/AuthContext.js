import { createContext, useState } from "react";

// ایجاد Context
export const AuthContext = createContext();

// Provider برای مدیریت توکن
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );

  const handleLogin = (token) => {
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
