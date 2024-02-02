import { useRef, useState } from "react";
import { TargetTime } from "../TargetTime/TargetTime";
import type { IResultModalApiHandle } from "../ResultModalApi/ResultModalApi";
import { ResultModalApi } from "../ResultModalApi/ResultModalApi";
import { TimerChallengeState } from "./TimerChallengeState";

export interface ITimerChallengeProps {
  title: string;
  targetTimeSeconds: number;
}

export function TimerChallenge(props: ITimerChallengeProps) {
  const [state, setState] = useState(
    new TimerChallengeState({ targetTimeSeconds: props.targetTimeSeconds }),
  );
  const timerIdRef = useRef<number | null>(null);
  const performanceRef = useRef<DOMHighResTimeStamp | null>(null);
  const dialogRef = useRef<IResultModalApiHandle>(null);

  const handleStart = () => {
    setState(s => new TimerChallengeState({ ...s, isTimerStarted: true }));
    performanceRef.current = performance.now();
    timerIdRef.current = setTimeout(() => {
      setState(s => TimerChallengeState.loss(s));
      dialogRef.current?.open();
    }, props.targetTimeSeconds * 1000);
  };

  const handleStop = () => {
    if (!timerIdRef.current || !performanceRef.current || !dialogRef.current)
      return;
    clearTimeout(timerIdRef.current);
    timerIdRef.current = null;

    let timeDiff =
      props.targetTimeSeconds * 1000 -
      (performance.now() - performanceRef.current);
    performanceRef.current = null;

    setState(s => TimerChallengeState.maybeWin(s, timeDiff));
    dialogRef.current.open();
  };

  const handleReset = () =>
    setState(
      new TimerChallengeState({ targetTimeSeconds: props.targetTimeSeconds }),
    );

  return (
    <>
      {/* <ResultModalProps
        isWin={state.isWin}
        targetTimeSeconds={props.targetTimeSeconds}
        dialogElRef={dialogElRef}
        onClose={handleReset}
      /> */}
      {/* <ResultModalForwardRef
        ref={dialogElRef}
        isWin={state.isWin}
        targetTimeSeconds={props.targetTimeSeconds}
        onClose={handleReset}
      /> */}
      <ResultModalApi
        ref={dialogRef}
        challengeState={state}
        onClose={handleReset}
      />
      <section className="challenge">
        <h2>{props.title}</h2>
        <p className="challenge-time">
          <TargetTime targetTimeSeconds={props.targetTimeSeconds} />
        </p>
        <p>
          {!state.isTimerStarted && (
            <button onClick={handleStart}>Start challenge</button>
          )}
          {state.isTimerStarted && (
            <button onClick={handleStop}>Stop challenge</button>
          )}
        </p>
        <p className={`${state.isTimerStarted ? "active" : ""} mt-2`}>
          {state.isTimerStarted && "Timer is running"}
          {!state.isTimerStarted && "Timer inactive"}
        </p>
      </section>
    </>
  );
}
