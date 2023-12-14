import { PropsWithChildren } from "react";

export interface ITabButton {
  onSelect(): void
}

export function TabButton(props: PropsWithChildren<ITabButton>) {
  return (
    <li>
      <button onClick={props.onSelect}>{props.children}</button>
    </li>
  );
}
