import { ProgressBar } from "../ProgressBar/ProgressBar";

export interface IDeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
  fullTimeout: number;
  timeoutProgress: number;
}

export function DeleteConfirmation(props: IDeleteConfirmationProps) {
  const onConfirm = props.onConfirm;

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={props.onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar value={props.timeoutProgress} max={props.fullTimeout} />
    </div>
  );
}
