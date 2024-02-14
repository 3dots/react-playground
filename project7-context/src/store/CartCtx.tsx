import { createContext } from "react";
import { CartState } from "./model/CartState";

export interface ICartStateWrapper {
  state: CartState;
  setState: (prevState: CartState) => void;
}

export const CartCtx = createContext<ICartStateWrapper>({
  state: CartState.initialState(),
  setState: () => {}
});