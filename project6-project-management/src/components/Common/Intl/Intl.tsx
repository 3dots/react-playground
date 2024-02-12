import type { ReactNode } from "react";
import type { IntlFormatters, IntlShape, PrimitiveType } from "react-intl";
import type { Props as ReactIntlFormattedMessageProps } from "react-intl/src/components/message";
import {
  FormattedNumber,
  FormattedMessage as ReactIntlFormattedMessage,
  useIntl as useReactIntl,
} from "react-intl";
import type enMessages from "@/translations/en.json";
import type { FormatXMLElementFn } from "intl-messageformat";

// Our new union type of all available message IDs.
export type IntlMessageKeys = keyof typeof enMessages;

// The arguments to the original formatMessage function.
type FormatMessageArgs = Parameters<IntlFormatters["formatMessage"]>;

// Extend the original FormattedMessage props.
type FormattedMessageProps = ReactIntlFormattedMessageProps<
  Record<string, ReactNode>
> & {
  id?: IntlMessageKeys;
};

export type TypedFormatMessage = (
  descriptor: FormatMessageArgs[0] & {
    id?: IntlMessageKeys;
  },
  values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>>,
  options?: FormatMessageArgs[2],
) => string;

export function FormattedMessage({ id, ...rest }: FormattedMessageProps) {
  return <ReactIntlFormattedMessage id={id} {...rest} />;
}

export type RIntlShape = Omit<IntlShape, "formatMessage"> & {
  formatMessage: TypedFormatMessage;
};
export const useIntl = () => useReactIntl() as RIntlShape;

export interface IFormattedCurrencyProps {
  currValue: number;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export function FormattedCurrency(props: IFormattedCurrencyProps) {
  const currency = props.currency ?? "CAD";
  const defaultDigits = 2;
  const minimumFractionDigits = props.minimumFractionDigits ?? defaultDigits;
  const maximumFractionDigits = props.maximumFractionDigits ?? defaultDigits;
  return (
    <FormattedNumber
      value={props.currValue}
      style="currency"
      currency={currency}
      minimumFractionDigits={minimumFractionDigits}
      maximumFractionDigits={maximumFractionDigits}
    />
  );
}
