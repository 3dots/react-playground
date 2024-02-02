import { useRef, useState } from "react";
import { TargetTime } from "../TargetTime/TargetTime";
import type { IResultModalApiHandle } from "../ResultModalApi/ResultModalApi";
import { ResultModalApi } from "../ResultModalApi/ResultModalApi";

export interface ITimerChallengeProps {
  title: string;
  targetTimeSeconds: number;
}

export class TimerChallengeState {
  targetTimeSeconds: number = 0;
  isTimerExpired: boolean = false;
  isTimerStarted: boolean = false;
  timeDiff: number = 0;
  isWin: boolean = false;

  computeIsWin() {
    this.isWin = this.isTimerExpired
      ? false
      : this.timeDiff / (1000 * this.targetTimeSeconds) < 0.2;
  }

  constructor(init?: Partial<TimerChallengeState>) {
    Object.assign(this, init);
  }

  static loss(s: TimerChallengeState): TimerChallengeState {
    return new TimerChallengeState({
      ...s,
      isTimerExpired: true,
      isTimerStarted: false,
    });
  }
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
    if (!timerIdRef.current || !performanceRef.current) return;
    clearTimeout(timerIdRef.current);
    timerIdRef.current = null;

    let timeDiff =
      props.targetTimeSeconds * 1000 -
      (performance.now() - performanceRef.current);
    performanceRef.current = null;

    if (timeDiff < 0) {
      //setTimeout messed up timing calculation. Prefer performance.now() verdict.
      setState(s => TimerChallengeState.loss(s));
    } else {
      setState(s => {
        let sNew = new TimerChallengeState({
          ...s,
          isTimerStarted: false,
          timeDiff: timeDiff,
        });
        sNew.computeIsWin();
        return sNew;
      });
    }

    dialogRef.current?.open();
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
