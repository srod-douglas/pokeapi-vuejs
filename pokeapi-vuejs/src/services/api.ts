import axios, { type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 5000,
});

export default api;