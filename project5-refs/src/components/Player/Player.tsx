import { useAppDispatch } from "@/app/hooks"
import { setName } from "@/features/inv-calculator/timerGameSlice"
import { useRef, useState } from "react"

class PlayerState {
  isSaved: boolean = false

  public constructor(init?: Partial<PlayerState>) {
    Object.assign(this, init)
  }
}

export function Player() {
  const dispatch = useAppDispatch();
  const [playerState, setPlayerState] = useState(new PlayerState());
  const playerNameInput = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (!playerNameInput.current) return;
    setPlayerState(p => new PlayerState({ ...p, isSaved: true }))
    dispatch(setName(playerNameInput.current.value))
  }

  return (
    <section id="player">
      <h2>
        Welcome {playerState.isSaved && playerNameInput.current ? playerNameInput.current.value : "unknown entity"}
      </h2>
      <p>
        <input
          type="text"
          ref={playerNameInput}
          onChange={() =>
            setPlayerState(
              p =>
                new PlayerState({ ...p, isSaved: false }),
            )
          }
        />
        <button onClick={handleSave}>Set name</button>
      </p>
    </section>
  )
}
