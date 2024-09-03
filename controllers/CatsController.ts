import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { generateJWT } from "../helpers/jwt";

import {
  getBreeds,
  getOneBreed,
  searchBreed,
} from "./../services/CatsServices";

export const getListsBreeds = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cats = await getBreeds();
    res.json({
      ok: true,
      cats,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al obtener gatos",
    });
  }
};

export const getDetailsBreed = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const breed = await getOneBreed(req.params.breed_ids);
    res.json({
      ok: true,
      breed,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al obtener gatos",
    });
  }
};

export const getSearchBreed = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const breed = await searchBreed(req.params.breed_ids);
    res.json({
      ok: true,
      breed,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al obtener gatos",
    });
  }
};

