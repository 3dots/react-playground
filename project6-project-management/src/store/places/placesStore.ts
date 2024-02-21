import type { AsyncTryCatchWrapper, GenericFunction, GenericPromiseFunction, TryCatchWrapper } from "@/components/Common/common";
import { useAppStore } from "../app/appStore";
import { PlacesState, type IPlacesStateWrapper } from "./model/PlacesState";
import { create } from "zustand";

function tryCatchWrapper<F extends GenericFunction>(
  func: F,
): TryCatchWrapper<F> {
  return (...args) => {
    try {
      return func(...args);
    } catch (error) {
      console.error(error);
      useAppStore.getState().errorTriggered();
    }
  };
}

function asyncTryCatchWrapper<F extends GenericPromiseFunction>(
  func: F,
): AsyncTryCatchWrapper<F> {
  return async (...args) => {
    try {
      console.log("sanity check");
      useAppStore.getState().setIsLoading(true);
      const result = await func(...args);
      //useAppStore.getState().setIsLoading(false);
      return result;
    } catch (error) {
      console.error(error);
      useAppStore.getState().errorTriggered();
    }
  };
}

export const usePlacesStore = create<IPlacesStateWrapper>(set => ({
  state: PlacesState.initialState(),
  resetState: () => set(() => ({ state: PlacesState.initialState() })),
  getPlaces: asyncTryCatchWrapper(async () => {
    await new Promise(r => setTimeout(r, 2000));
  }),
}));