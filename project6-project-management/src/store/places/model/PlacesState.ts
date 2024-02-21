import type { IPlaceDto } from "./IPlaceDto";

export interface IPlacesStateWrapper {
  state: PlacesState;
  resetState: () => void;
  getPlaces: () => void;
}

export class PlacesState {
  availablePlaces: IPlaceDto[] = [];

  public constructor(init?: Partial<PlacesState>) {
    Object.assign(this, init);
  }

  static initialState(): PlacesState {
    return new PlacesState();
  }
}