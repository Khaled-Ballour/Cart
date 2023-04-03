import { createContext, useContext, useEffect, useReducer } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider value={{ greeting }}>{children}</AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
