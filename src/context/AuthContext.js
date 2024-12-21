// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getTokenFromURL } from '../utils/getTokenFromURL';
import { validateToken } from '../services/authService'; // You'll need to implement this

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getTokenFromURL();
      if (token) {
        // Optionally validate the token with your backend
        try {
          const userData = await validateToken(token); // Implement this API call
          if (userData) {
            setAuth({
              isAuthenticated: true,
              user: userData.user,
              token: token,
              loading: false,
            });
            // Optionally, set up Clerk Auth session here
          } else {
            setAuth({
              isAuthenticated: false,
              user: null,
              token: null,
              loading: false,
            });
          }
        } catch (error) {
          console.error("Token validation failed:", error);
          setAuth({
            isAuthenticated: false,
            user: null,
            token: null,
            loading: false,
          });
        }
      } else {
        setAuth({
          isAuthenticated: false,
          user: null,
          token: null,
          loading: false,
        });
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
