import type { IntlMessageKeys, TypedFormatMessage } from "./Intl/Intl";

export function validateRequired(s: string, formatMessage: TypedFormatMessage, labelResourceId: IntlMessageKeys) {
  return s.trim() ? true : formatMessage(
    { id: "txt.is.empty" },
    { label: formatMessage({ id: labelResourceId }) },
  )
}