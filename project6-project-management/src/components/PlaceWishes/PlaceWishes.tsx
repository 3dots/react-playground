import { useCallback, useRef, useState } from "react";
import { Modal } from "./Modal/Modal";
import "./PlaceWishes.scss";
import type { IPlaceDto } from "@/store/places/model/IPlaceDto";
import { DeleteConfirmation } from "./DeleteConfirmation/DeleteConfirmation";
import logoImg from "@/assets/places-logo.png";
import { Places } from "./Places/Places";
import { AvailablePlaces } from "./AvailablePlaces/AvailablePlaces";
import { usePlacesStore } from "@/store/places/placesStore";

export function PlaceWishes() {
  const selectedPlace = useRef<IPlaceDto | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userPlaces, selectPlace, deleteSelectedPlace] = usePlacesStore(sw => [
    sw.state.selectedPlaces,
    sw.selectPlace,
    sw.deleteSelectedPlace,
  ]);

  const CONFIRM_DELAY = 3000;
  const progressTimerRef = useRef<number | null>(null);
  const [timeoutProgress, setTimeoutProgress] = useState(CONFIRM_DELAY);
  const progressRefreshTime = 50;

  function handleStopRemovePlace() {
    closeModal();
  }

  const handleRemovePlace = useCallback(() => {
    if (!selectedPlace.current) return;
    deleteSelectedPlace(selectedPlace.current);
    closeModal();
  }, [deleteSelectedPlace]);

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
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        <AvailablePlaces onSelectPlace={selectPlace} />
      </main>
    </div>
  );
}
