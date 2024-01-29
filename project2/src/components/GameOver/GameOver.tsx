import { EnTicToeState, GameBoardData } from "../GameBoard/GameBoardData";

export interface IGameOverProps {
  data: GameBoardData;
  onRematchClick: () => void;
}

export function GameOver(props: IGameOverProps) {
  return (
    <div id="game-over">
      <h2>Game over!</h2>
      {props.data.winner === EnTicToeState.NotSelected && <p>It's a draw.</p>}
      {props.data.winner !== null &&
        props.data.winner !== EnTicToeState.NotSelected && (
          <p>The winner is {props.data.playerString(props.data.winner)}.</p>
        )}
      <p>
        <button onClick={props.onRematchClick}>Rematch</button>
      </p>
    </div>
  );
}
