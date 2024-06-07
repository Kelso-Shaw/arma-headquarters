import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

const TOKEN_EXPIRATION_TIME = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiration = localStorage.getItem("tokenExpiration");

    if (token && expiration) {
      const isExpired = new Date().getTime() > Number(expiration);

      if (!isExpired) {
        setAuth({
          isAuthenticated: true,
          token,
        });
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.Success) {
          const expirationTime = new Date().getTime() + TOKEN_EXPIRATION_TIME;

          setAuth({
            isAuthenticated: true,
            token: data.accessToken,
          });
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("tokenExpiration", expirationTime);

          return { success: true };
        } else {
          return { success: false, message: "Login failed" };
        }
      } else {
        const error = await response.json();
        return { success: false, message: error.error || "Login failed" };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      token: null,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
