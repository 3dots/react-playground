import { useState } from "react";
import { BOARD_DIMENSION_COLUMNS, BOARD_DIMENSION_ROWS, EnTicToeState, GameBoardData, GameBoardDataLine } from "../GameBoardData";
import { GameBoardLine } from "../GameBoardLine/GameBoardLine";

export interface IGameBoardProps {
  data?: GameBoardData;
}

export function GameBoard(props: IGameBoardProps) {

  const [data, setData] = useState(props.data ?? new GameBoardData());

  const handleSelectSquare = (i: number, j: number) => {
    if (i < 0 || i > BOARD_DIMENSION_ROWS - 1 || j < 0 || j > BOARD_DIMENSION_COLUMNS) throw new Error("Nonsense index.");
    const state: EnTicToeState = data.rows[i].columns[j];
    if (state !== EnTicToeState.NotSelected) return; //Do nothing
    setData((curData) => {
      const newData = new GameBoardData(curData.rows, curData.playerTurn == 0 ? 1 : 0);
      newData.rows[i].columns[j] = curData.playerTurn == 0 ? EnTicToeState.Player1 : EnTicToeState.Player2;
      return newData;
    });
  }

  return (
    <ol id="game-board">
      {data.rows.map((row: GameBoardDataLine, index: number) =>
        <li key={index}><GameBoardLine columns={row.columns} rowIndex={index} onSelectSquare={handleSelectSquare} /></li>
      )}
    </ol>
  );
}