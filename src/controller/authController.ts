import bcrypt from "bcryptjs";
import { Response, Request } from "express";
import {
  ILogguedUserR,
  ILoginUser,
  INewUser,
  INoLogguedUserR,
} from "./authController.types";
import { generateJWT } from "../jwt/jwt";
import { IPayloadJWT } from "../middlewares/validate-jwt.types";
import { dataUsers } from "../database/dataUsers";

export const createUser = async (
  req: Request<{}, {}, INewUser>,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body;

  try {
    let NewUser = dataUsers.find((user) => user.email === email);
    if (NewUser) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un usuario con ese email",
      });
    }

    NewUser = {
      id: Math.max(...dataUsers.map((u) => u.id)) + 1,
      ...req.body,
    };

    // ! Encrypt password
    const salt = bcrypt.genSaltSync();
    NewUser.password = bcrypt.hashSync(password, salt);

    // ! Save user in database
    dataUsers.push(NewUser);

    // ! Generate JWT
    const token = await generateJWT(`${NewUser.id}`, NewUser.name);

    return res.status(201).json({
      ok: true,
      uid: NewUser.id,
      name: NewUser.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error al procesar la petición",
    });
  }
};

export const loginUser = async (
  req: Request<{}, {}, ILoginUser>,
  res: Response<INoLogguedUserR | ILogguedUserR>
): Promise<Response<INoLogguedUserR | ILogguedUserR>> => {
  const { email, password } = req.body;

  try {
    let LoginUser = dataUsers.find((user) => user.email === email);

    if (!LoginUser) {
      return res.status(400).json({
        ok: false,
        msg: "No se encontró un usuario con ese email",
      });
    }

    // ! Confirm password
    const validPassword = bcrypt.compareSync(password, LoginUser.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña incorrecta",
      });
    }

    // ! Generate JWT
    const token = await generateJWT(`${LoginUser.id}`, LoginUser.name);

    return res.status(200).json({
      ok: true,
      uid: LoginUser.id,
      name: LoginUser.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado... contacte al administrador",
    });
  }
};

export const renewToken = async (
  req: Request<{}, {}, IPayloadJWT>,
  res: Response
): Promise<void> => {
  const { uid, name } = req.body;
  const token = await generateJWT(uid, name);
  res.status(200).json({
    ok: true,
    uid,
    name,
    token,
  });
};
