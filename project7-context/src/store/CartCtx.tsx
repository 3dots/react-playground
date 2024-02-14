import { createContext } from "react";
import { CartState } from "./model/CartState";

export interface ICartStateWrapper {
  cart: CartState;
  setCart: (prevState: CartState) => void;
}

export const CartCtx = createContext<ICartStateWrapper>({
  cart: CartState.initialState(),
  setCart: () => {}
});