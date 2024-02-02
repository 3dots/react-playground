import { Player } from "./components/Player/Player";
import { TimerChallenge } from "./components/TimerChallenge/TimerChallenge";

export function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimerChallenge title="Easy" targetTimeSeconds={1} />
        <TimerChallenge title="Not easy" targetTimeSeconds={5} />
        <TimerChallenge title="Tough" targetTimeSeconds={10} />
        <TimerChallenge title="Pro" targetTimeSeconds={15} />
      </div>
    </>
  );
}
