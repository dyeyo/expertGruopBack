import { Router } from "express";
import { check } from "express-validator";
import { login, register } from "../controllers/UsersController";

const router = Router();
router.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La clave es obligatoria").not().notEmpty(),
  ],
  login
);
router.post(
  "/register",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La clave es obligatoria").not().notEmpty(),
  ],
  register
);

export default router;
