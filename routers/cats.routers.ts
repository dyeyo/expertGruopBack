import { Router } from "express";
import { getListsBreeds,getDetailsBreed } from "../controllers/CatsController";

const router = Router();

// Ruta para obtener hospitales
router.get("/", getListsBreeds);
router.get("/:breed_ids", getDetailsBreed);

export default router;
