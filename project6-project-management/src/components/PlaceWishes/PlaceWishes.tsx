import { useCallback, useRef, useState } from "react";
import { Modal } from "./Modal/Modal";
import "./PlaceWishes.scss";
import type { IPlaceDto } from "@/services/places/model/IPlaceDto";
import { DeleteConfirmation } from "./DeleteConfirmation/DeleteConfirmation";
import logoImg from '@/assets/places-logo.png';
import { Places } from "./Places/Places";
import { AvailablePlaces } from "./AvailablePlaces/AvailablePlaces";

export function PlaceWishes() {
  const selectedPlace = useRef<IPlaceDto | null>(null);
  const [userPlaces, setUserPlaces] = useState<IPlaceDto[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current?.id)
    );

    setModalIsOpen(false);
  }, []);

  function handleStartRemovePlace(place: IPlaceDto) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleSelectPlace(selectedPlace: IPlaceDto) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });
  }

  return (
    <div className="PlaceWishesContainer overflow-auto">
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

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </div>
  );
}
