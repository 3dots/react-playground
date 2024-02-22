import type { IPlaceDto } from "@/store/places/model/IPlaceDto";
import { Places } from "../Places/Places";
import { useEffect } from "react";
import { usePlacesStore } from "@/store/places/placesStore";

export interface IAvailablePlacesProps {
  onSelectPlace: (place: IPlaceDto) => void;
}

export function AvailablePlaces(props: IAvailablePlacesProps) {
  const [isInitialized, availablePlaces, getPlaces] = usePlacesStore(sw => [sw.state.isInitialized, sw.state.availablePlaces, sw.getPlaces]);

  useEffect(() => {
    if (!isInitialized) {
      getPlaces();
    }
  }, [isInitialized, getPlaces]);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={props.onSelectPlace}
    />
  );
}