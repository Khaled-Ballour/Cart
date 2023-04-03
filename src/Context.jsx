import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from './reducer';
import cartItems from './data';
import {
  CLEAR_CART,
  INCREASE,
  DECREASE,
  REMOVE,
  LOADING,
  DISPLAY_ITEMS,
} from './actions';

const AppContext = createContext();

const initialState = {
  loading: false,
  cart: new Map(
    cartItems.map((item) => {
      return [item.id, item];
    })
  ),
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  const remove = (id) => {
    dispatch({ type: REMOVE, payload: { id } });
  };

  return (
    <AppContext.Provider value={{ ...state, clearCart, remove }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
