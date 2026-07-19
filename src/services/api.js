import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

export const getCrimeData = async () => {
  const response = await api.get("/data");
  return response.data.Content;
};