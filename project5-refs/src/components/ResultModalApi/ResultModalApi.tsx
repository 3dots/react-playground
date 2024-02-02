import { forwardRef, useImperativeHandle, useRef } from "react";
import { TargetTime } from "../TargetTime/TargetTime";

export interface IResultModalApiProps {
  isWin: boolean;
  targetTimeSeconds: number;
  onClose: () => void;
}

export interface IResultModalApiHandle {
  open: () => void;
}

export const ResultModalApi = forwardRef<
  IResultModalApiHandle,
  IResultModalApiProps
>((props, ref) => {
  const dialogElRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open() {
      dialogElRef.current?.showModal();
    },
  }));

  return (
    <dialog className="result-modal" ref={dialogElRef}>
      <h2>{props.isWin ? "You won!" : "You lost!"}</h2>
      <p>
        The traget time was{" "}
        <strong>
          <TargetTime targetTimeSeconds={props.targetTimeSeconds} />
        </strong>
        .
      </p>
      <p></p>
      <form method="dialog">
        <button onClick={props.onClose}>Close</button>
      </form>
    </dialog>
  );
});
