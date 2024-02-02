import { forwardRef, useImperativeHandle, useRef } from "react";
import { TargetTime } from "../TargetTime/TargetTime";
import type { TimerChallengeState } from "../TimerChallenge/TimerChallenge"

export interface IResultModalApiProps {
  targetTimeSeconds: number;
  challengeState: TimerChallengeState;
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

  const isWin = props.challengeState.isWin;

  return (
    <dialog className="result-modal" ref={dialogElRef}>
      <h2>{isWin ? "You won!" : "You lost!"}</h2>
      <p>
        The traget time was{" "}
        <strong>
          <TargetTime targetTimeSeconds={props.targetTimeSeconds} />
        </strong>
        .
      </p>
      {isWin && <p>You were {props.challengeState.timeDiff}ms close to timer expiry.</p>}
      <form method="dialog">
        <button onClick={props.onClose}>Close</button>
      </form>
    </dialog>
  );
});
