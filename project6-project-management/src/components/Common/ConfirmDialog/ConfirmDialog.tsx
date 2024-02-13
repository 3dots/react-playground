import type { PropsWithChildren } from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { EnButtonType, RButton } from "../RButton/RButton";
import { FormattedMessage } from "../Intl/Intl";

export interface IConfirmDialogProps {
  onCancel?: () => void;
  onConfirm: () => void;
}

export interface IConfirmDialogHandle {
  open: () => void;
}

export const ConfirmDialog = forwardRef<
  IConfirmDialogHandle,
  PropsWithChildren<IConfirmDialogProps>
>((props, ref) => {
  const dialogElRef = useRef<HTMLDialogElement>(null);
  const children = props.children ?? <FormattedMessage id="txt.confirm" />;

  useImperativeHandle(ref, () => ({
    open() {
      dialogElRef.current?.showModal();
    },
  }));

  return createPortal(
    <dialog ref={dialogElRef} className="rounded">
      <div className="min-w-[15rem] flex flex-col gap-2 p-2">
        <div>{children}</div>
        <form method="dialog" className="flex gap-2 ml-auto">
          <RButton buttonType={EnButtonType.Secondary} onClick={props.onCancel}>
            <FormattedMessage id="btn.cancel" />
          </RButton>
          <RButton onClick={props.onConfirm}>
            <FormattedMessage id="btn.confirm" />
          </RButton>
        </form>
      </div>
    </dialog>,
    document.getElementById("modal-root")!,
  );
});
