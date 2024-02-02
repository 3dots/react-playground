import { useRef, useState } from "react";

export interface ITimerChallenge {
  title: string;
  targetTimeSeconds: number;
}

class TimerChallengeState {
  isTimerExpired: boolean = false;
  isTimerStarted: boolean = false;

  public constructor(init?: Partial<TimerChallengeState>) {
    Object.assign(this, init);
  }
}

export function TimerChallenge(props: ITimerChallenge) {
  const [state, setState] = useState(new TimerChallengeState());
  const timerIdRef = useRef<number | null>(null);

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
    }, props.targetTimeSeconds * 1000);
  };

  const handleStop = () => {
    if (!timerIdRef.current) return;
    clearTimeout(timerIdRef.current);
    timerIdRef.current = null;
    setState(s => new TimerChallengeState({ ...s, isTimerStarted: false }));
  };

  return (
    <section className="challenge">
      <h2>{props.title}</h2>
      {state.isTimerExpired && <p>You lost!</p>}
      <p className="challenge-time">
        {props.targetTimeSeconds} second{props.targetTimeSeconds > 1 ? "s" : ""}
      </p>
      <p>
        {!state.isTimerExpired && !state.isTimerStarted && (
          <button onClick={handleStart}>Start challenge</button>
        )}
        {state.isTimerStarted && (
          <button onClick={handleStop}>Stop challenge</button>
        )}
        {state.isTimerExpired && (
          <button onClick={() => setState(new TimerChallengeState())}>
            Reset challenge
          </button>
        )}
      </p>
      <p className={`${state.isTimerStarted ? "active" : ""} mt-2`}>
        {state.isTimerStarted && "Timer is running"}
        {!state.isTimerStarted && "Timer inactive"}
      </p>
    </section>
  );
}
