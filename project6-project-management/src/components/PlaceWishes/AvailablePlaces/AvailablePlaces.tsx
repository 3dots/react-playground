import type { IPlaceDto } from "@/store/places/model/IPlaceDto";
import { Places } from "../Places/Places";
import { useEffect } from "react";
import { usePlacesStore } from "@/store/places/placesStore";

export interface IAvailablePlacesProps {
  onSelectPlace: (place: IPlaceDto) => void;
}

export function AvailablePlaces(props: IAvailablePlacesProps) {
  const getPlaces = usePlacesStore(sw => sw.getPlaces);

  useEffect(() => {
    getPlaces();
  }, [getPlaces]);

  return (
    <Places
      title="Available Places"
      places={[]}
      fallbackText="No places available."
      onSelectPlace={props.onSelectPlace}
    />
  );
}