import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5050", // sua porta do backend!
});

export default api;
