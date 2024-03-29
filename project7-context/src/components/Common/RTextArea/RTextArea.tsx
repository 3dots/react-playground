import { forwardRef, type PropsWithChildren } from "react";

export interface RTextAreaProps extends React.ComponentProps<"textarea"> {
  isValid: boolean;
}

export const RTextArea = forwardRef(
  (
    props: PropsWithChildren<RTextAreaProps>,
    ref: React.ForwardedRef<HTMLTextAreaElement>,
  ) => {
    const {
      className: classNameProp,
      children,
      isValid,
      "aria-invalid": ariaInvalid,
      ...rest
    } = { ...props };

    let className =
      "py-1 px-2 border-b-2 rounded-sm bg-stone-200 text-stone-600";
    className += isValid
      ? " border-stone-300 focus:border-stone-600 focus:outline-none"
      : " border-red-600 focus:outline-2 focus:outline-red-600 focus:outline neg-outline";
    if (classNameProp) className += ` ${classNameProp}`;

    return (
      <label className="flex flex-col gap-1">
        {children !== undefined && <span>{children}</span>}
        <textarea
          ref={ref}
          className={className}
          {...rest}
          aria-invalid={!isValid ? "true" : undefined}
        />
      </label>
    );
  },
);
