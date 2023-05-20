import axios from "axios";
import { useEffect } from "react";

export const totalCostAmount = (cart) => {
  let totalAmount = 0;
  let totalCost = 0;
  for (let [id, { price, amount }] of cart) {
    totalAmount += amount;
    totalCost += amount * price;
  }
  return { totalAmount, totalCost };
};
