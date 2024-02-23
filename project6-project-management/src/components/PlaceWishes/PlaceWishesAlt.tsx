import { useCallback, useRef, useState } from "react";
import "./PlaceWishes.scss";
import type { IPlaceDto } from "@/store/places/model/IPlaceDto";
import { Modal } from "./Modal/Modal";
import { DeleteConfirmation } from "./DeleteConfirmation/DeleteConfirmation";
import logoImg from "@/assets/places-logo.png";
import { Places } from "./Places/Places";
import { AvailablePlacesAlt } from "./AvailablePlacesAlt/AvailablePlacesAlt";
import { placesApi } from "@/services/places/placesApi";
import { useRFetch } from "@/hooks/useRFetch";

export function PlaceWishesAlt() {
  const selectedPlace = useRef<IPlaceDto | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const CONFIRM_DELAY = 3000;
  const progressTimerRef = useRef<number | null>(null);
  const [timeoutProgress, setTimeoutProgress] = useState(CONFIRM_DELAY);
  const progressRefreshTime = 50;

  function handleStopRemovePlace() {
    closeModal();
  }

  const handleRemovePlace = useCallback(() => {
    if (!selectedPlace.current) return;
    //todo code delete
    //deleteSelectedPlace(selectedPlace.current);
    closeModal();
  }, []);

  function handleStartRemovePlace(place: IPlaceDto) {
    openModal();
    selectedPlace.current = place;
  }

  function openModal() {
    setModalIsOpen(true);
    setTimeoutProgress(CONFIRM_DELAY);
    progressTimerRef.current = setInterval(() => {
      setTimeoutProgress(x => {
        const newValue = x - progressRefreshTime;
        if (newValue <= 0) handleRemovePlace();
        return newValue;
      });
    }, progressRefreshTime);
  }

  function closeModal() {
    setModalIsOpen(false);
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  }

  const fetch1 = useCallback(() => placesApi.getSelectedPlaces(), []);
  const [selectedPlaces,, isLoadingSelectedPlaces, errorMsgSelectedPlaces] = useRFetch(fetch1);

  let fallBacktextSelectedPlaces = "Select the places you would like to visit below.";
  if (errorMsgSelectedPlaces) fallBacktextSelectedPlaces = errorMsgSelectedPlaces;
  if (isLoadingSelectedPlaces) fallBacktextSelectedPlaces = "Loading";

  function handleSelectPlace() {}

  const fetch2 = useCallback(() => placesApi.getPlaces(), []);
  const [availablePlaces, , isLoadingAvailablePlaces, errorMsgAvailablePlaces] = useRFetch(fetch2);

  let fallBackAvailablePlaces = "No places available.";
  if (errorMsgAvailablePlaces) fallBackAvailablePlaces = errorMsgAvailablePlaces;
  if (isLoadingAvailablePlaces) fallBackAvailablePlaces = "Loading";

  let userPlaces: IPlaceDto[] = [];
  if (availablePlaces !== null && selectedPlaces !== null) {
    const newList = [];
    for (const id of selectedPlaces) {
      const place = availablePlaces.find(x => x.id === id);
      if (place) newList.push(place);
    }
    userPlaces = newList;
  }

  return (
    <div className="PlaceWishesContainer MainContainer overflow-auto">
      <Modal isOpen={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
          fullTimeout={CONFIRM_DELAY}
          timeoutProgress={timeoutProgress}
        />
      </Modal>
      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={fallBacktextSelectedPlaces}
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        <AvailablePlacesAlt
          onSelectPlace={handleSelectPlace}
          fallbackText={fallBackAvailablePlaces}
          availablePlaces={availablePlaces}
        />
      </main>
    </div>
  );
}
