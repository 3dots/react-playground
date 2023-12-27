import { EnTicToeState } from "../GameBoardData";

export interface GameBoardLineProps {
  columns: EnTicToeState[],
  rowIndex: number,
  onSelectSquare: (i: number, j: number) => void
}

export function GameBoardLine(props: GameBoardLineProps) {
  return (
    <ol>
      {props.columns.map((state: EnTicToeState, columnIndex: number) =>
        <li key={columnIndex}>
          <button onClick={() => props.onSelectSquare(props.rowIndex, columnIndex)}>{state}</button>
        </li>
      )}
    </ol>
  );
}