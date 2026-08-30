import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: apiUrl,
});

export const getCrimeData = async (city) => {
  const response = await api.get(`/api/${city}`);
  return response.data.Content;
};