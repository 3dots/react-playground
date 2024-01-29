import { useState } from "react";
import { GameBoard } from "./components/GameBoard/GameBoard/GameBoard";
import {
  BOARD_DIMENSION_COLUMNS,
  BOARD_DIMENSION_ROWS,
  EnTicToeState,
  GameBoardData,
  GameLogEntry,
} from "./components/GameBoard/GameBoardData";
import { Player } from "./components/Player/Player";
import { GameLog } from "./components/GameLog/GameLog";
import { GameOver } from "./components/GameOver/GameOver";

export function App() {
  const [data, setData] = useState(new GameBoardData());

  const nextPlayer = (currPlayer: EnTicToeState) => {
    return currPlayer === EnTicToeState.Player1
      ? EnTicToeState.Player2
      : EnTicToeState.Player1;
  };

  const handleSelectSquare = (i: number, j: number) => {
    if (
      i < 0 ||
      i > BOARD_DIMENSION_ROWS - 1 ||
      j < 0 ||
      j > BOARD_DIMENSION_COLUMNS - 1
    )
      throw new Error("Nonsense index.");

    const state: EnTicToeState = data.rows[i].columns[j];
    if (state !== EnTicToeState.NotSelected) return; //Do nothing
    setData((curData) => {
      const newLogEntries = [
        new GameLogEntry({
          player: curData.activePlayer,
          row: i + 1,
          column: j + 1,
        }),
        ...curData.logEntries,
      ];
      const newData = new GameBoardData(
        curData.rows,
        nextPlayer(curData.activePlayer),
        newLogEntries,
        data.player1Name,
        data.player2Name
      );
      newData.rows[i].columns[j] = curData.activePlayer;
      return newData;
    });
  };

  const handleRematch = () => {
    setData(new GameBoardData());
  };

  const handleSetName = (name: string, player: EnTicToeState) => {
    const player1Name = player === EnTicToeState.Player1 ? name : data.player1Name;
    const player2Name = player === EnTicToeState.Player2 ? name : data.player2Name;
    setData(new GameBoardData(data.rows, data.activePlayer, data.logEntries, player1Name, player2Name));
  }

  const handleSetPlayer1Name = (name: string) => {
    handleSetName(name, EnTicToeState.Player1);
  }

  const handleSetPlayer2Name = (name: string) => {
    handleSetName(name, EnTicToeState.Player2);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={data.player1Name}
            symbol={EnTicToeState.Player1}
            isActive={data.activePlayer === EnTicToeState.Player1}
            onSave={handleSetPlayer1Name}
          />
          <Player
            name={data.player2Name}
            symbol={EnTicToeState.Player2}
            isActive={data.activePlayer === EnTicToeState.Player2}
            onSave={handleSetPlayer2Name}
          />
        </ol>
        {data.winner !== null && <GameOver data={data} onRematchClick={handleRematch} />}
        <GameBoard data={data} onSelectSquare={handleSelectSquare} />
      </div>
      <GameLog data={data} />
    </main>
  );
}
