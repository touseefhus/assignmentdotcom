import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000/api/chat",
});

export default api;
