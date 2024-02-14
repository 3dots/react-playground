import { forwardRef, type PropsWithChildren } from "react";

export interface RInputProps extends React.ComponentProps<"input"> {
  isValid: boolean;
  labelClassName?: string;
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
      labelClassName: labelClassNameProp,
      ...rest
    } = { ...props };

    let className =
      "py-1 px-2 border-b-2 rounded-sm bg-stone-200 text-stone-600";
    className += isValid
      ? " border-stone-300 focus:border-stone-600 focus:outline-none"
      : " border-red-600 focus:outline-2 focus:outline-red-600 focus:outline neg-outline";
    if (classNameProp) className += ` ${classNameProp}`;

    let labelClassName = "flex flex-col gap-1 min-w-0";
    if (labelClassNameProp) labelClassName += ` ${labelClassNameProp}`;

    return (
      <label className={labelClassName}>
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
