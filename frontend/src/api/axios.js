import axios from "axios";

const api = axios.create({
  // VITE_BASE_URL: "http://localhost:4000",
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
