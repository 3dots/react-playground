import { forwardRef, type PropsWithChildren } from "react";
import type { TypedFormatMessage } from "../Intl/Intl";
import { useIntl } from "../Intl/Intl";
import moment from "moment";

export interface RInputProps extends React.ComponentProps<"input"> {
  isValid: boolean;
}

function dateFormatMaxLength(_locale: string) {
  return 10; //M.dd.yyyy
}

export const RDatePicker = forwardRef(
  (
    props: PropsWithChildren<RInputProps>,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const {
      className: classNameProp,
      children,
      isValid,
      "aria-invalid": ariaInvalid,
      type,
      maxLength,
      ...rest
    } = { ...props };

    const intl = useIntl();

    let inputSpanClassName =
      "border-b-2 rounded-sm bg-stone-200 text-stone-600 flex";
    inputSpanClassName += isValid
      ? " border-stone-300 focus-within:border-stone-600 focus-within:outline-none"
      : " border-red-600 focus-within:outline-2 focus-within:outline-red-600 focus-within:outline neg-outline";

    let className = `py-1 pl-2 w-[5.4rem] bg-transparent outline-none`;
    if (classNameProp) className += ` ${classNameProp}`;

    return (
      <label className="flex flex-col gap-1">
        {children !== undefined && <span>{children}</span>}
        <span className="flex">
          <span className={inputSpanClassName}>
            <input
              ref={ref}
              className={className}
              type="text"
              {...rest}
              aria-invalid={!isValid ? "true" : undefined}
              placeholder={intl.formatMessage({ id: "txt.date.format" })}
              maxLength={dateFormatMaxLength(intl.locale)}
            />
            <svg
              fill="currentColor"
              className="h-7 w-7 p-1 mt-[0.185rem]"
            >
              <use xlinkHref="bootstrap-icons-custom.svg#calendar-event" />
            </svg>
          </span>
        </span>
      </label>
    );
  },
);

function myMoment(s: string, formatMessage: TypedFormatMessage) {
  return moment(s, formatMessage({ id: "moment.date.format" }), true);
}

export function validateDatePicker(
  s: string,
  formatMessage: TypedFormatMessage,
) {
  return myMoment(s, formatMessage).isValid()
    ? true
    : formatMessage({ id: "txt.bad.date.format" });
}

export function parseDate(s: string, formatMessage: TypedFormatMessage) {
  return myMoment(s, formatMessage).toDate();
}

export function formatDate(date: Date, formatMessage: TypedFormatMessage) {
  if (!date) return "";
  return moment(date).format(formatMessage({ id: "moment.date.format" }));
}
