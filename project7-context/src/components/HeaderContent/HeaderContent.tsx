import { useContext, useRef } from "react";
import type { ICartModalHandle } from "../CartModal/CartModal";
import { CartModal } from "../CartModal/CartModal";
import { CartCtx } from "@/store/CartCtx";

export function HeaderContent() {
  const modal = useRef<ICartModalHandle>(null);
  const { cart } = useContext(CartCtx);
  const cartQuantity = cart.items.length;

  let modalActions = <button>Close</button>;
  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal ref={modal} title="Your Cart" actions={modalActions} />
      <div id="main-title">
        <img src="logo.png" alt="Elegant model" />
        <h1>Elegant Context</h1>
      </div>
      <p>
        <button onClick={() => modal.current?.open()}>
          Cart ({cartQuantity})
        </button>
      </p>
    </>
  );
}
