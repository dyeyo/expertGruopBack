import { Router } from "express";
import { getListsBreeds } from "../controllers/ImagesController";

const router = Router();
router.get("/:breed_ids", getListsBreeds);

export default router;
