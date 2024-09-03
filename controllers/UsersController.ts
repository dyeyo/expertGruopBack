import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import Users from "../models/User";
import { generateJWT } from "../helpers/jwt";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Users.findOne({ email });
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: "Correo o contraseña incorrecto",
      });
    }

    // Verificar contraseña
    const validatePass = bcryptjs.compareSync(password, usuario.password);
    if (!validatePass) {
      return res.status(404).json({
        ok: false,
        msg: "Correo o contraseña incorrecto",
      });
    }

    // Generar token
    const token = await generateJWT(usuario.id);
    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

export const register = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const validateEmail = await Users.findOne({ email });
    if (validateEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'Correo existente, por favor prueba otro',
      });
    }

    const user = new Users(req.body);

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    const token = await generateJWT(user.id); // Asegúrate de que user.id se pase correctamente

    return res.json({
      ok: true,
      user,
      token,
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    });
  }
};
