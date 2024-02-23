import type { PropsWithChildren, ReactEventHandler } from "react";
import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export interface IModalProps {
  isOpen: boolean;
  onClose: ReactEventHandler<HTMLDialogElement>;
}

export function Modal(props: PropsWithChildren<IModalProps>) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (props.isOpen) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [props.isOpen]);

  return createPortal(
    <dialog className="modal PlaceWishesContainer" ref={dialog} onClose={props.onClose}>
      {props.isOpen ? props.children : null}
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
