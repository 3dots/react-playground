import { GameLogEntry, playerString } from "../GameBoard/GameBoardData";

export interface IGameLogProps {
  turns: GameLogEntry[]
}

export function GameLog(props: IGameLogProps) {
  return (
    <ol id="log">
      {props.turns.map((entry: GameLogEntry) =>
        <li key={`${entry.row}-${entry.column}`}>{playerString(entry.player)} Row: {entry.row} Column: {entry.column}</li>
      )}
    </ol>
  );
}