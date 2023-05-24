export type TypeParking = "Public" | "Private";

export interface ParkingEntry {
  id: number;
  address: string;
  amenities: string[];
  score: number;
  price: number;
  type: TypeParking;
  description: string;
  images:
    | {
        [fieldname: string]: Express.Multer.File[];
      }
    | Express.Multer.File[]
    | undefined;
}

export type NewParkingEntry = Omit<ParkingEntry, "id" | "images">;

export interface QueryParameters {
  price?: number[] | string[];
  type?: TypeParking;
  amenities?: string[];
}

export interface ImagesParking {
  [fieldname: string]: Express.Multer.File[];
}
