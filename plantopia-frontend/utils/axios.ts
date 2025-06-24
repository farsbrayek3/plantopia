// utils/axios.ts
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8081", // API Gateway
  withCredentials: true,
});

export default instance;
