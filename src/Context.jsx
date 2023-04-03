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
import { getTotals } from './util';

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
  const { totalAmount, totalCost } = getTotals(state.cart);
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  const remove = (id) => {
    dispatch({ type: REMOVE, payload: { id } });
  };
  const increase = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
  };
  const decrease = (id) => {
    dispatch({ type: DECREASE, payload: { id } });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
