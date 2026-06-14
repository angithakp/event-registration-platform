import axios from "axios";

const api = axios.create({
  baseURL: "https://event-registration-backend-vvf5.onrender.com/api/",
});

export default api;