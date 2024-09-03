import { IOneCat } from './../interfaces/ICat';
import axios from "axios";

export const getBreeds = async () => {
  try {
    const response = await axios.get(`${process.env.URL_CATS}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener razas de gatos:", error);
    throw new Error("No se pudieron obtener las razas de gatos");
  }
};

export const getOneBreed = async (breed:string) => {
  try {
    const response = await axios.get(`${process.env.URL_IMG}search?limit=10&breed_ids=${breed}&api_key=${process.env.API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener razas de gatos:", error);
    throw new Error("No se pudieron obtener las razas de gatos");
  }
};

export const searchBreed = async (breed:string) => {
  try {
    const response = await axios.get(`${process.env.URL_IMG}search?breed_ids=${breed}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener razas de gatos:", error);
    throw new Error("No se pudieron obtener las razas de gatos");
  }
}
