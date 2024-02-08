import { forwardRef, type PropsWithChildren } from "react";

export interface RTextAreaProps extends React.ComponentProps<"textarea"> {
}

export const RTextArea = forwardRef(
  (
    props: PropsWithChildren<RTextAreaProps>,
    ref: React.ForwardedRef<HTMLTextAreaElement>,
  ) => {
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
        <textarea ref={ref} className={className} {...rest} />
      </label>
    );
  }
);