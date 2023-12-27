import { useState } from "react";

export interface IPlayerProps {
  name: string,
  symbol: string
}

export function Player(props: IPlayerProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(props.name);

  const handleEditClick = () => {
    setIsEdit((x) => !x);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  return (
    <li>
      <span className="player">
        {isEdit &&
          <input type="text" required value={name} onChange={handleChange} />
        }
        {!isEdit &&
          <span className="player-name">{name}</span>
        }
        <span className="player-symbol">{props.symbol}</span>
      </span>
      <button onClick={handleEditClick}>
        {isEdit ? "Save" : "Edit"}
      </button>
    </li>
  );
}
