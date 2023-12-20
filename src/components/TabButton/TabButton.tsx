import { PropsWithChildren } from "react";

export interface ITabButton {
  onSelect(): void,
  isSelected: boolean
}

export function TabButton(props: PropsWithChildren<ITabButton>) {
  return (
    <li>
      <button className={props.isSelected ? "active" : ""} onClick={props.onSelect}>{props.children}</button>
    </li>
  );
}
