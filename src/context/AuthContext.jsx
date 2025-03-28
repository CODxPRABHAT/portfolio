import { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentUser, login as loginApi } from '../services/api';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await getCurrentUser();
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setLoading(false);
  };

  const refreshUser = async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error('Error refreshing user data:', error);
      return null;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await loginApi(email, password);
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      
      // Fetch fresh user data after login
      const freshUserData = await getCurrentUser();
      setUser(freshUserData.data);
      return freshUserData.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
} 