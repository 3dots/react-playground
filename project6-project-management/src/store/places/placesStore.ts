import { placesApi } from "@/services/places/placesApi";
import {
  asyncTryCatchLoadingWrapper,
  asyncTryCatchWrapper,
  tryCatchWrapper,
} from "../app/appStore";
import { PlacesState, type IPlacesStateWrapper } from "./model/PlacesState";
import { create } from "zustand";
import type { IPlaceDto } from "./model/IPlaceDto";

export const usePlacesStore = create<IPlacesStateWrapper>((set, get) => ({
  state: PlacesState.initialState(),
  resetState: () => set(() => ({ state: PlacesState.initialState() })),
  getPlaces: asyncTryCatchWrapper(async () => {
    const [places, selectedPlaces] = await Promise.all([
      placesApi.getPlaces(),
      placesApi.getSelectedPlaces(),
    ]);
    set(sw => ({ state: sw.state.setAvailablePlaces(places, selectedPlaces) }));
  }),
  setLocation: tryCatchWrapper(
    (latitude: number | null, longitude: number | null) => {
      set(sw => ({ state: sw.state.setLocation(latitude, longitude) }));
    },
  ),
  selectPlace: asyncTryCatchLoadingWrapper(async (place: IPlaceDto) => {
    if (get().state.isDuplicateSelectedPlace(place)) return;
    set(sw => ({ state: sw.state.selectPlace(place) }));
    await placesApi.saveSelectedPlaces(
      get().state.selectedPlaces.map(x => x.id),
    );
  }),
  deleteSelectedPlace: asyncTryCatchLoadingWrapper(async (place: IPlaceDto) => {
    set(sw => ({ state: sw.state.deleteSelectedPlace(place) }));
    await placesApi.saveSelectedPlaces(
      get().state.selectedPlaces.map(x => x.id),
    );
  }),
}));
