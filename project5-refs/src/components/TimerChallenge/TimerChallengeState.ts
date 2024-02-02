export class TimerChallengeState {
  targetTimeSeconds: number = 0;
  isTimerExpired: boolean = false;
  isTimerStarted: boolean = false;
  timeDiff: number = 0;
  isWin: boolean = false;
  score: number = 0;

  computeIsWin() {
    this.isWin = this.isTimerExpired
      ? false
      : this.timeDiff / (1000 * this.targetTimeSeconds) < 0.3;
    this.score = (1 - this.timeDiff / (1000 * this.targetTimeSeconds)) * 100;
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

  static maybeWin(
    s: TimerChallengeState,
    timeDiff: number,
  ): TimerChallengeState {
    if (timeDiff < 0) return this.loss(s);
    let sNew = new TimerChallengeState({
      ...s,
      isTimerStarted: false,
      timeDiff: timeDiff,
    });
    sNew.computeIsWin();
    return sNew;
  }
}
