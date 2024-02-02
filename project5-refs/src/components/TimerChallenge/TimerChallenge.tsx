import { useRef, useState } from "react";
import { TargetTime } from "../TargetTime/TargetTime";
import type { IResultModalApiHandle} from "../ResultModalApi/ResultModalApi";
import { ResultModalApi } from "../ResultModalApi/ResultModalApi";

export interface ITimerChallengeProps {
  title: string;
  targetTimeSeconds: number;
}

class TimerChallengeState {
  isTimerExpired: boolean = false;
  isTimerStarted: boolean = false;
  isWin: boolean = false;

  public constructor(init?: Partial<TimerChallengeState>) {
    Object.assign(this, init);
  }
}

export function TimerChallenge(props: ITimerChallengeProps) {
  const [state, setState] = useState(new TimerChallengeState());
  const timerIdRef = useRef<number | null>(null);
  const dialogRef = useRef<IResultModalApiHandle>(null);

  const handleStart = () => {
    setState(s => new TimerChallengeState({ ...s, isTimerStarted: true }));
    timerIdRef.current = setTimeout(() => {
      setState(
        s =>
          new TimerChallengeState({
            ...s,
            isTimerExpired: true,
            isTimerStarted: false,
          }),
      );
      dialogRef.current?.open();
    }, props.targetTimeSeconds * 1000);
  };

  const handleStop = () => {
    if (!timerIdRef.current) return;
    clearTimeout(timerIdRef.current);
    timerIdRef.current = null;
    setState(
      s =>
        new TimerChallengeState({ ...s, isTimerStarted: false, isWin: true }),
    );
    dialogRef.current?.open();
  };

  const handleReset = () => setState(new TimerChallengeState());

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
        isWin={state.isWin}
        targetTimeSeconds={props.targetTimeSeconds}
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
