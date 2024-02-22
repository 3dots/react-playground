import type {
  AsyncTryCatchWrapper,
  GenericPromiseFunction,
} from "@/components/Common/common";
import type { IPlaceDto } from "@/store/places/model/IPlaceDto";
import { nameof } from "@/store/util/util";

function apiTryCatchWrapper<F extends GenericPromiseFunction>(
  func: F,
  className: string,
  methodName: string,
  url: string,
): AsyncTryCatchWrapper<F> {
  return async (...args) => {
    try {
      const result = await func(...args);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(`${className} error ${methodName} ${url}`, {
        cause: error,
      });
    }
  };
}

async function rfetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const response = await fetch(input, init);
  if (response.ok) return response;
  throw new Error(`${rfetch.name} ${response.status} ${response.statusText}`);
}

class PlacesApi {
  private url: string = "http://localhost:3000";

  async getPlaces(): Promise<IPlaceDto[]> {
    const url = `${this.url}/places`;
    return apiTryCatchWrapper(
      async (): Promise<IPlaceDto[]> => {
        const response = await rfetch(url);
        const obj = await response.json();
        return obj?.places;
      },
      PlacesApi.name,
      nameof(this, "getPlaces"),
      url,
    )();
  }

  private get userPlacesUrl() {
    return `${this.url}/user-places`;
  }

  async getSelectedPlaces(): Promise<string[]> {
    const url = this.userPlacesUrl;
    return apiTryCatchWrapper(
      async (): Promise<string[]> => {
        const response = await rfetch(url);
        const obj = await response.json();
        return obj?.places;
      },
      PlacesApi.name,
      nameof(this, "getSelectedPlaces"),
      url,
    )();
  }

  async saveSelectedPlaces(placeIds: string[]): Promise<void> {
    const url = this.userPlacesUrl;
    const options: RequestInit = {
      method: "PUT",
      body: JSON.stringify(placeIds),
      headers: {
        "Content-Type": "application/json"
      }
    };
    return apiTryCatchWrapper(
      async (): Promise<void> => {
        await rfetch(url, options);
      },
      PlacesApi.name,
      nameof(this, "saveSelectedPlaces"),
      url,
    )();
  }
}

export const placesApi = new PlacesApi();
