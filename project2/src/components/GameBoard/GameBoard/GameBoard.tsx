import { GameBoardData, GameBoardDataLine } from "../GameBoardData";
import { GameBoardLine } from "../GameBoardLine/GameBoardLine";

export interface IGameBoardProps {
  data: GameBoardData;
  onSelectSquare: (i: number, j: number) => void;
}

export function GameBoard(props: IGameBoardProps) {
  return (
    <ol id="game-board">
      {props.data.rows.map((row: GameBoardDataLine, index: number) =>
        <li key={index}><GameBoardLine columns={row.columns} rowIndex={index} onSelectSquare={props.onSelectSquare} isGameOver={props.data.isGameOver} /></li>
      )}
    </ol>
  );
}