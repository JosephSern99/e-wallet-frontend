import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ApiService from '../services/api.service';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Initialize auth state on app load
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        if (token) {
          // Check if token is expired
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          
          if (decoded.exp < currentTime) {
            localStorage.removeItem('token');
            await setUser(null);
          } else {
            await setUser(user); // Set the user from the decoded token
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      const data = await ApiService.login(credentials);
      
      // Log the login response data
      console.log('Login response:', data);

      // Assuming the token is part of the login response
      const token = data.token;
      if (!token) {
        throw new Error('Token not found in login response');
      }

      // Store the token (e.g., in localStorage or a state management solution)
      localStorage.setItem('token', token);
      
      setUser(data.user);
      console.log('User set after login:', data.user); // Debug log


      return { success: true, data };
    } catch (err) {
      console.error('Login error:', err); // Log the error for debugging
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, message };
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      await ApiService.register(userData);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      return { success: false, message };
    }
  };

  const logout = () => {
    ApiService.logout();
    setUser(null);
    router.push('/login');
  };

  const verifyEmail = async (token) => {
    try {
      setError(null);
      await ApiService.verifyEmail(token);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Email verification failed';
      setError(message);
      return { success: false, message };
    }
  };

  const resetPassword = async (email) => {
    try {
      setError(null);
      await ApiService.resetPassword(email);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Password reset request failed';
      setError(message);
      return { success: false, message };
    }
  };

  const confirmResetPassword = async (token, newPassword) => {
    try {
      setError(null);
      await ApiService.confirmResetPassword(token, newPassword);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Password reset failed';
      setError(message);
      return { success: false, message };
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    verifyEmail,
    resetPassword,
    confirmResetPassword,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};