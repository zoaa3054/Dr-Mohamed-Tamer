import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'admin');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAdminPassword(docSnap.data().password);
        } else {
          // Default password if not set
          const defaultPass = 'admin123';
          await setDoc(docRef, { password: defaultPass });
          setAdminPassword(defaultPass);
        }
      } catch (error) {
        console.error("Error fetching admin settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
    
    // Check local storage for session
    const session = sessionStorage.getItem('admin_session');
    if (session === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (password) => {
    if (password === adminPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_session', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_session');
  };

  const updatePassword = async (newPassword) => {
    try {
      const docRef = doc(db, 'settings', 'admin');
      await setDoc(docRef, { password: newPassword });
      setAdminPassword(newPassword);
      return true;
    } catch (error) {
      console.error("Error updating password:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, updatePassword, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
