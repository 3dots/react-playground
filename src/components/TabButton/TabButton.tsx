import { PropsWithChildren } from "react";

export interface ITabButtonProps extends React.ComponentProps<"button"> {
  isSelected: boolean;
}

export function TabButton(props: PropsWithChildren<ITabButtonProps>) {
  const { isSelected, children, className, ...attrs } = { ...props };

  return (
    <li>
      <button
        className={`${className ?? ""} ${props.isSelected ? "active" : ""}`}
        {...attrs}
      >
        {props.children}
      </button>
    </li>
  );
}
