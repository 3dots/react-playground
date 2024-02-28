import { create } from "zustand";
import type { IAppStateWrapper } from "./model/AppState";
import { AppState } from "./model/AppState";
import type {
  AsyncTryCatchWrapper,
  GenericFunction,
  GenericPromiseFunction,
  TryCatchWrapper,
} from "@/components/Common/common";

function stringifyError(error: any) {
  return JSON.stringify(error, Object.getOwnPropertyNames(error));
}

export function tryCatchWrapper<F extends GenericFunction>(
  func: F,
): TryCatchWrapper<F> {
  return (...args) => {
    try {
      return func(...args);
    } catch (error) {
      console.error(error);
      useAppStore.getState().errorTriggered(stringifyError(error));
    }
  };
}

export function asyncTryCatchLoadingWrapper<F extends GenericPromiseFunction>(
  func: F,
): AsyncTryCatchWrapper<F> {
  return async (...args) => {
    try {
      useAppStore.getState().setIsLoading(true);
      const result = await func(...args);
      useAppStore.getState().setIsLoading(false);
      return result;
    } catch (error) {
      console.error(error);
      useAppStore.getState().errorTriggered(stringifyError(error));
    }
  };
}

export function asyncTryCatchWrapper<F extends GenericPromiseFunction>(
  func: F,
): AsyncTryCatchWrapper<F> {
  return async (...args) => {
    try {
      const result = await func(...args);
      return result;
    } catch (error) {
      console.error(error);
      useAppStore.getState().errorTriggered(stringifyError(error));
    }
  };
}

export const useAppStore = create<IAppStateWrapper>(set => ({
  state: AppState.initialState(),
  resetState: () => set(() => ({ state: AppState.initialState() })),
  errorTriggered: (msg?: string) => set(sw => ({ state: sw.state.error(msg) })),
  testException: tryCatchWrapper(() =>
    set(() => {
      throw new Error("reducer exception");
    }),
  ),
  setIsLoading: tryCatchWrapper((isLoading: boolean) =>
    set(sw => ({ state: sw.state.setIsLoading(isLoading) })),
  ),
  login: tryCatchWrapper((isAuthenticated: boolean) =>
    set(sw => ({ state: sw.state.login(isAuthenticated) })),
  ),
}));
