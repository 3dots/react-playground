import type { IPlaceDto } from "@/store/places/model/IPlaceDto";
import { Places } from "../Places/Places";

export interface IAvailablePlacesAltProps {
  onSelectPlace: (place: IPlaceDto) => void;
  availablePlaces: IPlaceDto[] | null;
  fallbackText: string;
}

export function AvailablePlacesAlt(props: IAvailablePlacesAltProps) {
  return (
    <Places
      title="Available Places"
      places={props.availablePlaces ?? []}
      fallbackText={props.fallbackText}
      onSelectPlace={props.onSelectPlace}
    />
  );
}
