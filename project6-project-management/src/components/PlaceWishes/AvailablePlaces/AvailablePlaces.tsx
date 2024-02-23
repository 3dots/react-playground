import type { IPlaceDto } from "@/store/places/model/IPlaceDto";
import { Places } from "../Places/Places";
import { useEffect } from "react";
import { usePlacesStore } from "@/store/places/placesStore";
import { useAppStore } from "@/store/app/appStore";

export interface IAvailablePlacesProps {
  onSelectPlace: (place: IPlaceDto) => void;
}

export function AvailablePlaces(props: IAvailablePlacesProps) {
  const [
    isFetched,
    availablePlaces,
    getPlaces,
    isLocationSet,
    setLocation,
  ] = usePlacesStore(sw => [
    sw.state.isFetched,
    sw.state.availablePlaces,
    sw.getPlaces,
    sw.state.isLocationSet,
    sw.setLocation
  ]);
  const setIsLoading = useAppStore(sw => sw.setIsLoading);

  useEffect(() => {
    if (!isFetched) {
      setIsLoading(true);
      getPlaces();
    }
  }, [isFetched, getPlaces, setIsLoading]);

  useEffect(() => {
    if (!isLocationSet) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocation(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setLocation(null, null);
        },
      );
    }
  }, [isLocationSet, setLocation, setIsLoading]);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={props.onSelectPlace}
    />
  );
}
