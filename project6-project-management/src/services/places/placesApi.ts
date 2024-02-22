import type {
  AsyncTryCatchWrapper,
  GenericPromiseFunction,
} from "@/components/Common/common";
import type { IPlaceDto } from "@/store/places/model/IPlaceDto";
import { nameof } from "@/store/util/util";

class PlacesApi {
  private url: string = "http://localhost:3000";

  asyncTryCatchWrapper<F extends GenericPromiseFunction>(
    func: F,
    methodName: string,
    url: string,
  ): AsyncTryCatchWrapper<F> {
    return async (...args) => {
      try {
        const result = await func(...args);
        return result;
      } catch (error) {
        console.error(error);
        throw new Error(`PlacesApi error ${methodName} ${url}`, {
          cause: error,
        });
      }
    };
  }

  async getPlaces(): Promise<IPlaceDto[]> {
    const url = `${this.url}/places`;
    return this.asyncTryCatchWrapper(
      async (): Promise<IPlaceDto[]> => {
        const response = await fetch(url);
        const obj = await response.json();
        return obj?.places;
      },
      nameof(this, "getPlaces"),
      url,
    )();
  }
}

export const placesApi = new PlacesApi();
