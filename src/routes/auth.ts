import { Router } from "express";
import { check } from "express-validator";
import { validatefields } from "../middlewares/validateFields";
import {
  createUser,
  loginUser,
  renewToken,
} from "../controller/authController";
import { validarJWT } from "../middlewares/validate-jwt";
const router = Router();

// ! ****** Route /api/auth

// * This route is for new users
router.post(
  "/new",
  [
    // ! Middlewares
    check("name", "Un nombre válido es requerido")
      .not()
      .isEmpty()
      .isLength({ min: 3 }),
    check("email", "Un email válido es requerido").not().isEmpty().isEmail(),
    check(
      "password",
      "La contraseña debe de contener al menos 6 caracteres donde se incluyan letras simbolos y numeros"
    )
      .not()
      .isEmpty()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/),
    validatefields,
  ],
  createUser
);

// * This route is for login
router.post(
  "/login",
  [
    check("email", "El email es requerido").not().isEmpty().isEmail(),
    check(
      "password",
      "La contraseña debe de contener al menos 6 caracteres donde se incluyan letras simbolos y numeros"
    )
      .not()
      .isEmpty()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/),
    validatefields,
  ],
  loginUser
);

// * This route is for renew token
router.get("/renew", validarJWT, renewToken);

export default router;
