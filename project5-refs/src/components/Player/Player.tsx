import { useAppDispatch } from "@/app/hooks"
import { setName } from "@/features/inv-calculator/timerGameSlice"
import { useState } from "react"

class PlayerState {
  name: string = ""
  isSaved: boolean = false

  public constructor(init?: Partial<PlayerState>) {
    Object.assign(this, init)
  }
}

export function Player() {
  const dispatch = useAppDispatch()
  const [playerState, setPlayerState] = useState(new PlayerState())

  const handleSave = () => {
    setPlayerState(p => new PlayerState({ ...p, isSaved: true }))
    dispatch(setName(playerState.name))
  }

  return (
    <section id="player">
      <h2>
        Welcome {playerState.isSaved ? playerState.name : "unknown entity"}
      </h2>
      <p>
        <input
          type="text"
          value={playerState.name}
          onChange={e =>
            setPlayerState(
              p =>
                new PlayerState({ ...p, name: e.target.value, isSaved: false }),
            )
          }
        />
        <button onClick={handleSave}>Set name</button>
      </p>
    </section>
  )
}
