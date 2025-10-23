import axios from "axios";


const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "https://movies-list-nine-psi.vercel.app",
});

export default api;
