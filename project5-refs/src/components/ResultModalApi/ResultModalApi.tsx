import { forwardRef, useImperativeHandle, useRef } from "react";
import { TargetTime } from "../TargetTime/TargetTime";
import type { TimerChallengeState } from "../TimerChallenge/TimerChallengeState";

export interface IResultModalApiProps {
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

  const challengeState: TimerChallengeState = props.challengeState;
  const isWin = challengeState.isWin;

  return (
    <dialog className="result-modal" ref={dialogElRef}>
      <h2>{isWin ? "You won!" : "You lost!"}</h2>
      <p>
        The traget time was{" "}
        <strong>
          <TargetTime targetTimeSeconds={challengeState.targetTimeSeconds} />
        </strong>
        .
      </p>
      {!challengeState.isTimerExpired && (
        <p>You were {challengeState.timeDiff}ms close to timer expiry.</p>
      )}
      {challengeState.isWin && <p>Score: {challengeState.score.toFixed(0)}</p>}
      <form method="dialog">
        <button onClick={props.onClose}>Close</button>
      </form>
    </dialog>
  );
});
