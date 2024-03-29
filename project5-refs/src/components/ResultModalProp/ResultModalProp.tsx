import { TargetTime } from "../TargetTime/TargetTime";

export interface IResultModalPropsProps {
  isWin: boolean;
  targetTimeSeconds: number;
  dialogElRef: React.RefObject<HTMLDialogElement>;
  onClose: () => void;
}

export function ResultModalProps(props: IResultModalPropsProps) {
  return (
    <dialog className="result-modal" ref={props.dialogElRef}>
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
}
