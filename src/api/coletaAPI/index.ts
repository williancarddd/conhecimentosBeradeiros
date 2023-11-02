import axios from "axios";

export const coletaAPI = axios.create({
  baseURL: "http://192.168.100.175:3000",
});
