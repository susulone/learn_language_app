import React, { createContext, useEffect, useState } from 'react';

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  let [userRole, setUserRole] = useState('student');

  return (
    <GlobalContext.Provider
      value={{
        userRole,
        setUserRole,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
