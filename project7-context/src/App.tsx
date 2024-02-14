import { useState } from "react";
import { HeaderContent } from "./components/HeaderContent/HeaderContent";
import { Store } from "./components/Store/Store";
import { CartCtx } from "./store/CartCtx";
import { CartState } from "./store/model/CartState";

export function App() {
  const [cart, setCart] = useState(CartState.initialState());

  return (
    <CartCtx.Provider value={{ cart, setCart }}>
      <header id="main-header">
        <HeaderContent />
      </header>
      <main>
        <Store />
      </main>
    </CartCtx.Provider>
  );
}
