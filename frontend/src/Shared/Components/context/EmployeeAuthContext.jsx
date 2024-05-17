import { createContext, useEffect, useState } from 'react';

export const EmployeeAuthContext = createContext({
  isLoggedIn: false,
  employeePersonId: null,
  login: () => {},
  logout: () => {}
});

export const EmployeeAuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedIsLoggedIn = localStorage.getItem('isLoggedInEmployee');
    return savedIsLoggedIn ? JSON.parse(savedIsLoggedIn) : false;
  });

  const [employeePersonId, setEmployeePersonId] = useState(() => {
    const savedEmployeePersonId = localStorage.getItem('employeePersonId');
    return savedEmployeePersonId ? JSON.parse(savedEmployeePersonId) : null;
  });

  useEffect(() => {
    localStorage.setItem('isLoggedEmployee', JSON.stringify(isLoggedIn));
    localStorage.setItem('employeePersonId', JSON.stringify(employeePersonId));
  }, [isLoggedIn, employeePersonId]);

  const login = (employeePersonId) => {
    console.log('Setting employeePersonId:', employeePersonId);
    console.log(employeePersonId) // Add this line for debugging
    setIsLoggedIn(true);
    setEmployeePersonId(employeePersonId);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setEmployeePersonId(null);
  };

  return (
    <EmployeeAuthContext.Provider value={{ isLoggedIn, employeePersonId, login, logout }}>
      {children}
    </EmployeeAuthContext.Provider>
  );
};

export default EmployeeAuthProvider;