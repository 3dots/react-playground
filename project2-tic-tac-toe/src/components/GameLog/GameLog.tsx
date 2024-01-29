import { GameBoardData, GameLogEntry } from "../GameBoard/GameBoardData";

export interface IGameLogProps {
  data: GameBoardData
}

export function GameLog(props: IGameLogProps) {
  return (
    <ol id="log">
      {props.data.logEntries.map((entry: GameLogEntry) =>
        <li key={`${entry.row}-${entry.column}`}>{props.data.playerString(entry.player)} Row: {entry.row} Column: {entry.column}</li>
      )}
    </ol>
  );
}