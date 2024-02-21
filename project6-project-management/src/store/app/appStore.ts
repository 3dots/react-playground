import type { StoreApi} from "zustand";
import { create } from "zustand";
import type { IAppStateWrapper } from "./model/AppState";
import { AppState } from "./model/AppState";
import type { GenericFunction, TryCatchWrapper } from "@/components/Common/common";

function errorState(set: StoreApi<IAppStateWrapper>["setState"]) {
  set(sw => ({ state: sw.state.error() }));
}

function tryCatchWrapper<F extends GenericFunction>(
  func: F,
  set: StoreApi<IAppStateWrapper>["setState"]
): TryCatchWrapper<F> {
  return (...args) => {
    try {
      return func(...args);
    } catch (error) {
      console.error(error);
      errorState(set);
    }
  };
}

export const useAppStore = create<IAppStateWrapper>(set => ({
  state: AppState.initialState(),
  resetState: () => set(() => ({ state: AppState.initialState() })),
  errorTriggered: () => errorState(set),
  eventWrapper<F extends GenericFunction>(func: F) {
    return (...args) => {
      try {
        return func(...args);
      } catch (error) {
        console.error(error);
        errorState(set);
      }
    };
  },
  testException: tryCatchWrapper(() => set(() => { throw new Error("reducer exception"); }), set)
}));
