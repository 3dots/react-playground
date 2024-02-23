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

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  const handleRemovePlace = useCallback(
    function handleRemovePlace() {
      if (!selectedPlace.current) return;
      deleteSelectedPlace(selectedPlace.current);
      setModalIsOpen(false);
    },
    [deleteSelectedPlace],
  );

  function handleStartRemovePlace(place: IPlaceDto) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  return (
    <div className="PlaceWishesContainer MainContainer overflow-auto">
      <Modal isOpen={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
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
