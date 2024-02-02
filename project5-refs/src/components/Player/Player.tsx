import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectName, setName } from "@/features/inv-calculator/timerGameSlice";
import { useRef } from "react";

export function Player() {
  const dispatch = useAppDispatch();
  const name = useAppSelector(selectName);
  const playerNameInput = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (!playerNameInput.current) return;
    dispatch(setName(playerNameInput.current.value));
  };

  return (
    <section id="player">
      <h2>Welcome {name === "" ? "unknown entity" : name}</h2>
      <p>
        <input type="text" ref={playerNameInput} />
        <button onClick={handleSave}>Set name</button>
      </p>
    </section>
  );
}
