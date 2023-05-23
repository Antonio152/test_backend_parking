import { Router } from "express";
// import { check } from "express-validator";
import multer from "multer";
import {
  getAllParking,
  getParkingById,
  postParking,
  updateParking,
  deleteParking,
} from "../controller/parkingController";
import { validarJWT } from "../middlewares/validate-jwt";
// import { validatefields } from "../middlewares/validateFields";
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
//TODO:: ADD VALIDATIONS
router.post("/", upload.array("image"), postParking);

//Update a parking
//TODO: ADD VALIDATIONS
router.put("/:id", upload.array("image"), updateParking);

//Delete a parking
router.delete("/:id", deleteParking);

export default router;
