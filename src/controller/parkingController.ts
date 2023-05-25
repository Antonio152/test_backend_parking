import { Response, Request } from "express";
import { dataParking } from "../database/dataParking";
import {
  ParkingEntry,
  NewParkingEntry,
  ImagesParking,
  IUpdateParkingEntry,
} from "./parking.types";

export const getAllParking = (
  _req: Request,
  res: Response<ParkingEntry[]>
): Promise<Response<ParkingEntry[]>> => {
  return new Promise((resolve, _) => {
    return resolve(res.status(200).json(dataParking));
  });
};
export const postParking = (
  req: Request<{}, {}, { body: string }>,
  res: Response<ParkingEntry>
): Promise<Response<ParkingEntry>> => {
  const { image: images } = req.files as ImagesParking;
  const parking = JSON.parse(req.body.body) as NewParkingEntry;
  return new Promise((resolve, _) => {
    const id =
      dataParking.length > 0
        ? Math.max(...dataParking.map((p) => p.id)) + 1
        : 1;

    const newParkingEntry = {
      id,
      images,
      ...parking,
    };

    dataParking.push(newParkingEntry);

    return resolve(res.status(200).json(newParkingEntry));
  });
};

export const getParkingById = (
  req: Request,
  res: Response<ParkingEntry | {}>
): Promise<Response<ParkingEntry | {}>> => {
  const id = req.params.id;
  return new Promise((resolve, _) => {
    const parkingFilter = dataParking.find((p) => p.id === +id);
    if (parkingFilter) {
      resolve(res.status(200).json(parkingFilter));
    }
    resolve(res.status(200).json({}));
  });
};

export const deleteParking = (
  req: Request,
  res: Response<{ status: string }>
): Promise<Response<{ status: string }>> => {
  const id = req.params.id;
  return new Promise((resolve, _) => {
    const parking = dataParking.find((p) => p.id === +id);
    if (parking) {
      dataParking.splice(dataParking.indexOf(parking), 1);
      resolve(res.status(200).json({ status: "success" }));
    }
    resolve(res.status(200).json({ status: "not-found" }));
  });
};

export const updateParking = (
  req: Request<any, {}, { body: string }>,
  res: Response<ParkingEntry | { status: string }>
): Promise<Response<ParkingEntry | { status: string }>> => {
  return new Promise((resolve, _) => {
    //Values of request
    const id = req.params.id;
    const parkingD = JSON.parse(req.body.body) as IUpdateParkingEntry;
    const { image: imagesToUpdated } = req.files as ImagesParking;

    //Find if the element exist
    const parkingToUpdate = dataParking.find((p) => p.id === +id);
    if (parkingToUpdate) {
      //Images inside array
      const lastImages = parkingToUpdate.images as Express.Multer.File[];

      //Delete images
      if (parkingD.imagesDelete && parkingD.imagesDelete.length > 0) {
        parkingD.imagesDelete.filter((originalname) => {
          const index = lastImages.findIndex(
            (i) => i.originalname === originalname
          );
          if (index !== null) {
            lastImages.splice(index, 1);
          }
        });
      }

      //Update array images
      let imagesUpdated: Express.Multer.File[] = [];

      //Check if the user send images
      if (!imagesToUpdated) {
        imagesUpdated = lastImages;
      } else {
        imagesUpdated = lastImages
          .concat(imagesToUpdated)
          .filter(
            (image, index, self) =>
              index ===
              self.findIndex((t) => t.originalname === image.originalname)
          );
      }

      const parking = {
        ...parkingD,
        images: imagesUpdated,
      };
      //Create a object with the data
      const updatedParking = { ...parkingToUpdate, ...parking };
      //Find the position of element in array
      const index = dataParking.findIndex((p) => p.id === +id);
      if (index !== null) {
        //assign the new data
        dataParking[+index] = updatedParking;
        return resolve(res.status(200).json(updatedParking));
      }
      return resolve(res.status(200).json({ status: "Something went wrong" }));
    }
    return resolve(res.status(200).json({ status: "not-found" }));
  });
};
