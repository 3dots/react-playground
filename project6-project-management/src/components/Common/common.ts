import type { IntlMessageKeys, TypedFormatMessage } from "./Intl/Intl";

export function validateRequired(
  s: string,
  formatMessage: TypedFormatMessage,
  labelResourceId: IntlMessageKeys,
) {
  return s.trim()
    ? true
    : formatMessage(
        { id: "txt.is.empty" },
        { label: formatMessage({ id: labelResourceId }) },
      );
}

/**
 * Generic function that accepts any number of parameters.
 */
export type GenericFunction = (...args: any[]) => any;

export type GenericPromiseFunction = (...args: any[]) => Promise<any>;

/**
 * Can be used to wrap a function within a function with the
 * same signature.
 *
 * @param F - Function that should be wrapped.
 */
export type TryCatchWrapper<F extends GenericFunction> = (
  ...args: Parameters<F>
) => ReturnType<F>;

export type AsyncTryCatchWrapper<F extends GenericPromiseFunction> = (
  ...args: Parameters<F>
) => Promise<Awaited<ReturnType<F>>>