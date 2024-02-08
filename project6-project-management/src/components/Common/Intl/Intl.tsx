import type { ReactNode } from "react";
import type { IntlFormatters, PrimitiveType } from "react-intl";
import type { Props as ReactIntlFormattedMessageProps } from "react-intl/src/components/message";
import {
  FormattedNumber,
  FormattedMessage as ReactIntlFormattedMessage,
  useIntl as useReactIntl,
} from "react-intl";
import type enMessages from "@/translations/en.json";
import type { FormatXMLElementFn } from "intl-messageformat";

// Our new union type of all available message IDs.
type IntlMessageKeys = keyof typeof enMessages;

// The arguments to the original formatMessage function.
type FormatMessageArgs = Parameters<IntlFormatters["formatMessage"]>;

// Extend the original FormattedMessage props.
type FormattedMessageProps = ReactIntlFormattedMessageProps<
  Record<string, ReactNode>
> & {
  id?: IntlMessageKeys;
};

export function FormattedMessage({ id, ...rest }: FormattedMessageProps) {
  return <ReactIntlFormattedMessage id={id} {...rest} />;
}

export function useIntl() {
  // Pull out the original formatMessage function.
  const { formatMessage, ...rest } = useReactIntl();

  // Re-write the formatMessage function but with a strongly-typed id.
  const typedFormatMessage = (
    descriptor: FormatMessageArgs[0] & {
      id?: IntlMessageKeys;
    },
    values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>>,
    options?: FormatMessageArgs[2],
  ) => {
    return formatMessage(descriptor, values, options);
  };

  return {
    ...rest,
    formatMessage: typedFormatMessage,
  };
}

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
