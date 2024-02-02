import { forwardRef } from "react";
import { TargetTime } from "../TargetTime/TargetTime";

export interface IResultModalProps {
  isWin: boolean;
  targetTimeSeconds: number;
  onClose: () => void;
}

export const ResultModal = forwardRef((props: IResultModalProps, ref: React.ForwardedRef<HTMLDialogElement>) => {
  return (
    <dialog className="result-modal" ref={ref}>
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