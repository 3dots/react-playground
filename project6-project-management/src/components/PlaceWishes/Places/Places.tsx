import type { IPlaceDto } from "@/store/places/model/IPlaceDto";

export interface IPlacesProps {
  title: string,
  places: IPlaceDto[],
  fallbackText: string
  onSelectPlace: (place: IPlaceDto) => void;
}

export function Places(props: IPlacesProps) {
  const places = props.places;
  console.log(places);
  return (
    <section className="places-category">
      <h2>{props.title}</h2>
      {places.length === 0 && <p className="fallback-text">{props.fallbackText}</p>}
      {places.length > 0 && (
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => props.onSelectPlace(place)}>
                <img src={`http://localhost:3000/${place.image.src}`} alt={place.image.alt} />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
