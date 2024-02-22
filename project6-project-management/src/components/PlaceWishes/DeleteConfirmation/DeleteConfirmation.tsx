import { useEffect } from "react";
import { ProgressBar } from "../ProgressBar/ProgressBar";

const TIMER = 3000;

export interface IDeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmation(props: IDeleteConfirmationProps) {
  const onConfirm = props.onConfirm;

  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]);

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
      <ProgressBar timer={TIMER} />
    </div>
  );
}
