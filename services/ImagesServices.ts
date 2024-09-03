import { IOneCat } from "./../interfaces/ICat";
import axios from "axios";

export const getImagesByBreedid = async (breedId: string) => {
  try {
    const response = await axios.get(
      `${process.env.URL_IMG}search?breed_ids=${breedId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener razas de gatos:", error);
    throw new Error("No se pudieron obtener las razas de gatos");
  }
};
