import { useEffect, useRef, useState, React } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from "./loc.js"

const STORAGE_KEY = "storage";
function initPickedPlaces() {
  const json = localStorage.getItem(STORAGE_KEY);
  if (!json) return [];
  try {
    const ids = JSON.parse(json);
    return ids.map(x => AVAILABLE_PLACES.find(p => p.id === x));
  } catch {
    return [];
  }
}

function App() {
  const modal = useRef();
  const selectedPlace = useRef();

  const [pickedPlaces, setPickedPlaces] = useState(initPickedPlaces());
  const [availablePlaces, setAvailablePlaces] = useState(AVAILABLE_PLACES);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);
      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pickedPlaces.map(x => x.id)));
  }, [pickedPlaces])

  function handleStartRemovePlace(id) {
    openModal();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    closeModal();
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    closeModal();
  }

  const delayTimerRef = useRef(null);
  const confirmDelay = 3000;

  const progressTimerRef = useRef(null);
  const [timeoutProgress, setTimeoutProgress] = useState(0);
  const progressRefreshTime = 50;

  function openModal() {
    modal.current.open();
    setTimeoutProgress(0);
    delayTimerRef.current = setTimeout(() => {
      handleRemovePlace();
    }, confirmDelay);
    progressTimerRef.current = setInterval(() => {
      setTimeoutProgress(x => x + progressRefreshTime);
    }, progressRefreshTime);
  }

  function closeModal() {
    modal.current.close();
    if (delayTimerRef.current) {
      clearTimeout(delayTimerRef.current);
      delayTimerRef.current = null;
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
          fullTimeout={confirmDelay}
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
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
