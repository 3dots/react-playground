export interface IImageDto {
  src: string;
  alt: string;
}

export interface IPlaceDto {
  id: string;
  title: string;
  image: IImageDto;
  lat: number;
  lon: number;
}
