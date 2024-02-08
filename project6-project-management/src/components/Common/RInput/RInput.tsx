import type { PropsWithChildren } from "react";

export interface RInputProps extends React.ComponentProps<"input"> {
}

export function RInput(props: PropsWithChildren<RInputProps>) {
  const {
    className: classNameProp,
    children,
    ...rest
  } = { ...props };

  let className = "py-1 px-2 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
  if (classNameProp) className += ` ${classNameProp}`;

  return (
    <label className="flex flex-col gap-1">
      {children !== undefined && <span>{children}</span>}
      <input className={className} {...rest} />
    </label>
  );
}