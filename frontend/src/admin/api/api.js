import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // This must match backend
});

export default instance;
