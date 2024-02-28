export interface IProgressBarProps {
  value: number;
  max: number;
}

export function ProgressBar(props: IProgressBarProps) {
  return <progress value={props.value} max={props.max} />;
}
