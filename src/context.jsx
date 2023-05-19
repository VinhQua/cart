import { useContext, useReducer, useEffect, createContext } from "react";
const AppContext = createContext();
import { reducer } from "./reducer";
import {
  CLEAR_CART,
  REMOVE_CART,
  INCREASE_CART,
  DECREASE_CART,
  LOADING,
  DISPLAY_ITEMS,
} from "./action";
import cartItems from "./data";

const initialSate = {
  loading: false,
  cart: new Map(cartItems.map((item) => [item.id, item])),
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialSate);

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART, payload: { id } });
  };
  const increase = (id) => {
    dispatch({ type: INCREASE_CART, payload: { id } });
  };
  const decrease = (id) => {
    dispatch({ type: DECREASE_CART, payload: { id } });
  };

  return (
    <AppContext.Provider
      value={{ ...state, clearCart, removeItem, increase, decrease }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
