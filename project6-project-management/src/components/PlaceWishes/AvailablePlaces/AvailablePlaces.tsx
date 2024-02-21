import type { IPlaceDto } from "@/services/places/model/IPlaceDto";
import { Places } from "../Places/Places";

export interface IAvailablePlacesProps {
  onSelectPlace: (place: IPlaceDto) => void;
}

export function AvailablePlaces(props: IAvailablePlacesProps) {
  return (
    <Places
      title="Available Places"
      places={[]}
      fallbackText="No places available."
      onSelectPlace={props.onSelectPlace}
    />
  );
}