import { createContext, useEffect, useState } from 'react';

// Create a context for authentication
export const AuthContext = createContext({
  isLoggedIn: false,
  cusId: null,
  login: () => {},
  logout: () => {}
});

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
  // Initialize the state from local storage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedIsLoggedIn = localStorage.getItem('isLoggedIn');
    return savedIsLoggedIn ? JSON.parse(savedIsLoggedIn) : false;
  });

  const [cusId, setCusId] = useState(() => {
    const savedCusId = localStorage.getItem('cusId');
    return savedCusId ? JSON.parse(savedCusId) : null;
  });

  // Save the authentication state to local storage when it changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    localStorage.setItem('cusId', JSON.stringify(cusId));
  }, [isLoggedIn, cusId]);

  // Define login and logout functions
  const login = (customerId) => {
    setIsLoggedIn(true);
    setCusId(customerId);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCusId(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, cusId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
