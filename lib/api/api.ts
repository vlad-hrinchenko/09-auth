import axios from "axios";

// Axios працює з route handlers як із proxy
export const axiosConfig = axios.create({
  baseURL: "/api",
  withCredentials: true,
});
