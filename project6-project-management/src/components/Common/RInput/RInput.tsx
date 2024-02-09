import { forwardRef, type PropsWithChildren } from "react";
import { FieldError } from "react-hook-form";

export interface RInputProps extends React.ComponentProps<"input"> {
  isValid: FieldError | undefined;
}

export const RInput = forwardRef(
  (
    props: PropsWithChildren<RInputProps>,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const {
      className: classNameProp,
      children,
      isValid,
      "aria-invalid": ariaInvalid,
      ...rest
    } = { ...props };

    let className = "py-1 px-2 border-b-2 rounded-sm bg-stone-200 text-stone-600 focus:outline-none ";
    className += isValid === false ? "border-red-600" : "border-stone-300 focus:border-stone-600";
    if (classNameProp) className += ` ${classNameProp}`;

    return (
      <label className="flex flex-col gap-1">
        {children !== undefined && <span>{children}</span>}
        <input
          ref={ref}
          className={className}
          {...rest}
          aria-invalid={!isValid ? "true" : undefined}
        />
      </label>
    );
  },
);
