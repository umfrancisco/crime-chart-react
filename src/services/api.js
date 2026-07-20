import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

export const getCrimeData = async (city) => {
  const response = await api.get(`/api/${city}`);
  return response.data.Content;
};