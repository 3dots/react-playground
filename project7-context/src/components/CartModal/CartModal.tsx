import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { Cart } from "../Cart/Cart";

export interface ICartModalProps {
  title: string
  actions: React.JSX.Element
}

export interface ICartModalHandle {
  open: () => void;
}

export const CartModal = forwardRef<
  ICartModalHandle,
  ICartModalProps
>((props, ref) => {
  const dialogElRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open() {
      dialogElRef.current?.showModal();
    },
  }));

  return createPortal(
    <dialog id="modal" ref={dialogElRef}>
      <h2>{props.title}</h2>
      <Cart />
      <form method="dialog" id="modal-actions">
        {props.actions}
      </form>
    </dialog>,
    document.getElementById("modal-root")!,
  );
});
