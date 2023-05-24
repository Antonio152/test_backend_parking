import { ImagesParking, NewParkingEntry } from "../controller/parking.types";

export const validateParking = (value: string) => {
  const { address, amenities, score, price, type, description } = JSON.parse(
    value
  ) as NewParkingEntry;
  //Validate address
  if (!address || address.length < 3) {
    throw new Error("Una dirección válida es requerida");
  }
  //Validate amenities
  if (Object.keys(amenities).length === 0) {
    throw new Error("Ingresa al menos una comodidad válida");
  }
  //Validate score
  if (score < 1 || score > 5 || typeof score !== "number") {
    throw new Error("El puntage debe ser mayor a 1 y menor a 5");
  }
  //Validate price
  if (price < 0 || typeof price !== "number") {
    throw new Error("Proporciona un precio válido");
  }
  //Validate type
  if (type !== "Public" && type !== "Private") {
    throw new Error("Proporciona un tipo válido");
  }
  //Validate description
  if (description.length < 3 || typeof description !== "string") {
    throw new Error("Una descripción válida es requerida");
  }
  return true;
};

export const validateImage = (req: ImagesParking) => {
  if (Object.keys(req.files).length <= 0) {
    throw new Error("Sube al menos una imagen");
  }
  if (Object.keys(req.files).length >= 10) {
    throw new Error("Maximo 10 imagenes");
  }
  return true;
};
