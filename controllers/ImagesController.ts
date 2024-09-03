import { Request, Response } from "express";
import {
  getImagesByBreedid,
} from "./../services/ImagesServices";

export const getListsBreeds = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const images = await getImagesByBreedid(req.params.breed_ids);
    res.json({
      ok: true,
      images,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al obtener gatos",
    });
  }
};
