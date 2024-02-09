import type { PropsWithChildren } from "react";

export interface IRH1Props extends React.ComponentProps<"h1"> {
  isDefaultMB?: boolean;
}

export function RH1(props: PropsWithChildren<IRH1Props>) {
  const {
    className: classNameProp,
    isDefaultMB: isDefaultMarginProp,
    children,
    ...rest
  } = { ...props };
  const isDefaultMB = isDefaultMarginProp ?? true;

  let className = "text-2xl font-bold";
  if (isDefaultMB) className += ` mb-2`;
  if (classNameProp) className += ` ${classNameProp}`;

  return (
    <h1 className={className} {...rest}>
      {children}
    </h1>
  );
}
