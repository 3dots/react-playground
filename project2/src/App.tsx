import { useState } from "react";
import { GameBoard } from "./components/GameBoard/GameBoard/GameBoard";
import { BOARD_DIMENSION_COLUMNS, BOARD_DIMENSION_ROWS, EnTicToeState, GameBoardData, GameLogEntry, playerString } from "./components/GameBoard/GameBoardData";
import { Player } from "./components/Player/Player"
import { GameLog } from "./components/GameLog/GameLog";


export function App() {
  const [data, setData] = useState(new GameBoardData());

  const nextPlayer = (currPlayer: EnTicToeState) => {
    return currPlayer === EnTicToeState.Player1 ? EnTicToeState.Player2: EnTicToeState.Player1;
  }

  const handleSelectSquare = (i: number, j: number) => {
    if (i < 0 || i > BOARD_DIMENSION_ROWS - 1 || j < 0 || j > BOARD_DIMENSION_COLUMNS) throw new Error("Nonsense index.");

    const state: EnTicToeState = data.rows[i].columns[j];
    if (state !== EnTicToeState.NotSelected) return; //Do nothing
    setData((curData) => {
      const newLogEntries = [new GameLogEntry({ player: curData.activePlayer, row: i + 1, column: j + 1 }), ...curData.logEntries]
      const newData = new GameBoardData(curData.rows, nextPlayer(curData.activePlayer), newLogEntries);
      newData.rows[i].columns[j] = curData.activePlayer;
      return newData;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={playerString(EnTicToeState.Player1)} symbol={EnTicToeState.Player1} isActive={data.activePlayer === EnTicToeState.Player1} />
          <Player name={playerString(EnTicToeState.Player2)} symbol={EnTicToeState.Player2} isActive={data.activePlayer === EnTicToeState.Player2} />
        </ol>
        <GameBoard data={data} onSelectSquare={handleSelectSquare} />
      </div>
      <GameLog turns={data.logEntries} />
    </main>
  );
}
