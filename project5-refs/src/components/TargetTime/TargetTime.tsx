export interface ITargetTimeProps {
  targetTimeSeconds: number;
}

export function TargetTime(props: ITargetTimeProps) {
  return (
    <>
      {props.targetTimeSeconds} second{props.targetTimeSeconds > 1 ? "s" : ""}
    </>
  );
}
