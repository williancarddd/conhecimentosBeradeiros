import axios from "axios";

export const coletaAPI = axios.create({
  baseURL: "http://192.168.1.104:3000",
});
