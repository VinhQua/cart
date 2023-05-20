import React from "react";
import {
  CLEAR_CART,
  REMOVE_CART,
  INCREASE_CART,
  DECREASE_CART,
  LOADING,
  DISPLAY_ITEMS,
} from "./action";
export const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }
  if (action.type === REMOVE_CART) {
    const { id } = action.payload;
    const newCart = new Map(state.cart);
    newCart.delete(id);
    return { ...state, cart: newCart };
  }
  if (action.type === INCREASE_CART) {
    const { id } = action.payload;
    const newCart = new Map(state.cart);
    const item = newCart.get(id);
    const newItem = { ...item, amount: item.amount + 1 };
    newCart.set(id, newItem);
    return { ...state, cart: newCart };
  }
  if (action.type === DECREASE_CART) {
    const { id } = action.payload;
    const newCart = new Map(state.cart);
    const item = newCart.get(id);

    if (item.amount === 1) {
      newCart.delete(id);
      return { ...state, cart: newCart };
    }
    const newItem = { ...item, amount: item.amount - 1 };
    newCart.set(id, newItem);
    return { ...state, cart: newCart };
  }
  if (action.type === LOADING) {
    return { ...state, loading: false };
  }
  if (action.type === DISPLAY_ITEMS) {
    const newCart = new Map(action.payload.data.map((item) => [item.id, item]));
    return { ...state, loading: false, cart: newCart };
  }
  throw new Error(`no matching action type :${action.type}`);
};
