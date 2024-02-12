import type { PropsWithChildren } from "react";

export interface IRAProps extends React.ComponentProps<"a"> {
  isDarkBackground?: boolean;
}

export function RA(props: PropsWithChildren<IRAProps>) {
  const {
    isDarkBackground: isDarkBackgroundProp,
    className: classNameProp,
    children,
    href: hrefProp,
    ...rest
  } = { ...props };
  //const isDarkBackground = isDarkBackgroundProp ?? false;
  const href = hrefProp ?? "";

  let className = "p-1 hover:bg-stone-400 rounded";
  if (classNameProp) className += ` ${classNameProp}`;

  return (
    <a className={className} href={href} {...rest}>
      {children}
    </a>
  );
}
