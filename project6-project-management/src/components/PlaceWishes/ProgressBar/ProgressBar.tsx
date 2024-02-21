import { useState, useEffect } from 'react';

export interface IProgressBarProps {
  timer: number;
}

export function ProgressBar(props: IProgressBarProps) {
  const timer = props.timer;
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress value={remainingTime} max={timer} />;
}