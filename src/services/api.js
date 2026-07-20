import axios from "axios";

const api = axios.create({
  baseURL: "https://staging-api-public-security-a9e2.encr.app",
});

export const getCrimeData = async (city) => {
  const response = await api.get(`/api/${city}`);
  return response.data.Content;
};