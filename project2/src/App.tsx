import { GameBoard } from "./components/GameBoard/GameBoard/GameBoard";
import { EnTicToeState } from "./components/GameBoard/GameBoardData";
import { Player } from "./components/Player/Player"

export function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player name="Player 1" symbol={EnTicToeState.Player1} />
          <Player name="Player 2" symbol={EnTicToeState.Player2} />
        </ol>
        <GameBoard />
      </div>
    </main>
  );
}
