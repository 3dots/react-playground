import type React from "react";
import { NavLink, type NavLinkProps } from "react-router-dom";

type TempType = NavLinkProps & React.RefAttributes<HTMLAnchorElement>;
export interface IRNavLinkProps extends TempType {}

export function RNavLink(props: IRNavLinkProps) {
  const { className: classNameProp, children, ...rest } = { ...props };

  let className =
    "underline disabled:bg-stone-400 disabled:cursor-not-allowed hover:text-amber-900";
  if (classNameProp) className += ` ${classNameProp}`;

  let activeClass = "text-amber-700";

  return (
    <NavLink
      className={p => `${className} ${p.isActive ? activeClass : ""}`}
      {...rest}
    >
      {children}
    </NavLink>
  );
}
