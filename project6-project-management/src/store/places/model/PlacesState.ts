import { sortPlacesByDistance } from "../util/loc";
import type { IPlaceDto } from "./IPlaceDto";

export interface IPlacesStateWrapper {
  state: PlacesState;
  resetState: () => void;
  getPlaces: () => void;
  setLocation: (latitude: number | null, longitude: number | null) => void;
  selectPlace: (place: IPlaceDto) => void;
  deleteSelectedPlace: (place: IPlaceDto) => void;
}

export class PlacesState {
  isInitialized: boolean = false;

  isFetched: boolean = false;
  availablePlaces: IPlaceDto[] = [];

  isLocationSet: boolean = false;
  latitude: number | null = null;
  longitude: number | null = null;

  selectedPlaces: IPlaceDto[] = [];

  public constructor(init?: Partial<PlacesState>) {
    Object.assign(this, init);
  }

  static initialState(): PlacesState {
    return new PlacesState();
  }

  setAvailablePlaces(
    places: IPlaceDto[],
    selectedPlaceIds: string[],
  ): PlacesState {
    const selectedPlaces = [];
    for (const id of selectedPlaceIds) {
      const place = places.find(x => x.id === id);
      if (place) selectedPlaces.push(place);
    }

    if (
      this.isLocationSet &&
      this.latitude !== null &&
      this.longitude !== null
    ) {
      return new PlacesState({
        ...this,
        availablePlaces: sortPlacesByDistance(
          places,
          this.latitude,
          this.longitude,
        ),
        selectedPlaces: selectedPlaces,
        isFetched: true,
        isInitialized: true,
      });
    } else if (this.isLocationSet) {
      //user declined location
      return new PlacesState({
        ...this,
        availablePlaces: places,
        selectedPlaces: selectedPlaces,
        isFetched: true,
        isInitialized: true,
      });
    } else {
      return new PlacesState({
        ...this,
        availablePlaces: places,
        selectedPlaces: selectedPlaces,
        isFetched: true,
      });
    }
  }

  setLocation(latitude: number | null, longitude: number | null): PlacesState {
    if (this.isFetched) {
      if (latitude !== null && longitude !== null) {
        return new PlacesState({
          ...this,
          isLocationSet: true,
          latitude,
          longitude,
          availablePlaces: sortPlacesByDistance(
            this.availablePlaces,
            latitude,
            longitude,
          ),
          isInitialized: true,
        });
      } else {
        //user declined location
        return new PlacesState({
          ...this,
          isLocationSet: true,
          isInitialized: true,
        });
      }
    } else {
      return new PlacesState({
        ...this,
        latitude,
        longitude,
        isLocationSet: true,
      });
    }
  }

  isDuplicateSelectedPlace(place: IPlaceDto): boolean {
    return this.selectedPlaces.some(x => x.id === place.id);
  }

  selectPlace(place: IPlaceDto): PlacesState {
    return new PlacesState({
      ...this,
      selectedPlaces: [place, ...this.selectedPlaces],
    });
  }

  deleteSelectedPlace(selectedPlace: IPlaceDto): PlacesState {
    return new PlacesState({
      ...this,
      selectedPlaces: this.selectedPlaces.filter(
        x => x.id !== selectedPlace.id,
      ),
    });
  }
}
