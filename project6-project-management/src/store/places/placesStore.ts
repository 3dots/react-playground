import { placesApi } from "@/services/places/placesApi";
import { asyncTryCatchLoadingWrapper } from "../app/appStore";
import { PlacesState, type IPlacesStateWrapper } from "./model/PlacesState";
import { create } from "zustand";

export const usePlacesStore = create<IPlacesStateWrapper>(set => ({
  state: PlacesState.initialState(),
  resetState: () => set(() => ({ state: PlacesState.initialState() })),
  getPlaces: asyncTryCatchLoadingWrapper(async () => {
    const places = await placesApi.getPlaces();
    set((sw) => ({ state: sw.state.setAvailablePlaces(places) }));
  }),
}));