import { useState } from "react";

export interface ITimerChallenge {
  title: string;
  targetTimeSeconds: number;
}

class TimerChallengeState {
  isTimeExpired: boolean = false;

  public constructor(init?: Partial<TimerChallengeState>) {
    Object.assign(this, init);
  }
}

export function TimerChallenge(props: ITimerChallenge) {
  const [state, setState] = useState(new TimerChallengeState());

  const handleStart = () => {
    setTimeout(() => {}, props.targetTimeSeconds * 1000);
  };

  return (
    <section className="challenge">
      <h2>{props.title}</h2>
      <p className="challenge-time">
        {props.targetTimeSeconds} second{props.targetTimeSeconds > 1 ? "s" : ""}
      </p>
      <p>
        <button>Start challenge</button>
      </p>
      <p className="">Time is running</p>
    </section>
  );
}
