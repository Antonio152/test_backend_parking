import { Router } from "express";
import { body } from "express-validator";
import multer from "multer";
import {
  getAllParking,
  getParkingById,
  postParking,
  updateParking,
  deleteParking,
} from "../controller/parkingController";
import { validarJWT } from "../middlewares/validate-jwt";
import { validateFields as validateFields } from "../middlewares/validateFields";
import { validateImage, validateParking } from "../helper/validateParking";
const router = Router();
// Configure multer to save uploaded files in memory
const upload = multer({ storage: multer.memoryStorage() });

// ! ****** Route /api/parking
//All routes need JWT validation
router.use(validarJWT);

//Get all parkings
router.get("/", getAllParking);

//Get parking by id
router.get("/:id", getParkingById);

//Create a new parking
router.post(
  "/",
  upload.fields([
    {
      name: "image",
      maxCount: 10,
    },
    {
      name: "body",
    },
  ]),
  [
    // ! Middlewares
    body("image").custom((_, { req }) => validateImage(req)),
    body("body").custom(validateParking),
    validateFields,
  ],
  postParking
);

//Update a parking
// TODO: Later implement function to only update the field, without send all the data
router.put(
  "/:id",
  upload.fields([
    {
      name: "image",
      maxCount: 10,
    },
    {
      name: "body",
    },
  ]),
  [
    // ! Middlewares
    // body("image").custom((_, { req }) => validateImage(req)),
    body("body").custom(validateParking),
    validateFields,
  ],
  updateParking
);

//Delete a parking
router.delete("/:id", deleteParking);

export default router;
