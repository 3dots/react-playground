import type { PropsWithChildren } from "react";

export enum EnButtonType {
  Primary = 0,
  Secondary = 1,
}

export interface IRButtonProps extends React.ComponentProps<"button"> {
  isDarkBackground?: boolean;
  buttonType?: EnButtonType;
}

export function RButton(props: PropsWithChildren<IRButtonProps>) {
  const {
    isDarkBackground: isDarkBackgroundProp,
    buttonType: buttonTypeProp,
    className: classNameProp,
    children,
    ...rest
  } = { ...props };
  const isDarkBackground = isDarkBackgroundProp ?? false;
  const buttonType = buttonTypeProp ?? EnButtonType.Primary;

  let className = "py-2 px-3 rounded-md hover:bg-amber-900 focus:bg-amber-900 flex";
  switch (buttonType) {
    case EnButtonType.Primary:
      className += ` text-gray-400 ${isDarkBackground ? "bg-stone-700" : "bg-stone-900"}`;
      break;
    case EnButtonType.Secondary:
      className += ` hover:text-white focus:text-white`;
      break;
  }
  if (classNameProp) className += ` ${classNameProp}`;

  return (
    <button className={className} {...rest}>
      <span className="fix-button-text">{children}</span>
    </button>
  );
}
