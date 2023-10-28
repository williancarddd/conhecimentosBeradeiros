import axios from "axios";

export const iaAPI = axios.create({
  baseURL: "http://golden-shepherd-unique.ngrok-free.app",
});
