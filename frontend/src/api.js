import axios from "axios";


const api = axios.create({
  baseURL:
    process.env.REACT_APP_BACKEND_URL ||
    "http://localhost:5050" || // 🔹 usa o backend local se a variável não existir
    "https://movies-list-nine-psi.vercel.app", // 🔹 fallback de produção
});

export default api;
