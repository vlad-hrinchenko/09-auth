import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://09-auth-two.vercel.app/api";

export const axiosConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
