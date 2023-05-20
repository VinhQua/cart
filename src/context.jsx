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

import { totalCostAmount } from "./utilis";
import axios from "axios";

const initialSate = {
  loading: true,
  cart: new Map(),
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialSate);

  const { totalAmount, totalCost } = totalCostAmount(state.cart);

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

  const getData = async () => {
    dispatch({ type: LOADING });
    try {
      const { data } = await axios.get(
        "https://www.course-api.com/react-useReducer-cart-project"
      );

      dispatch({ type: DISPLAY_ITEMS, payload: { data } });
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
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
