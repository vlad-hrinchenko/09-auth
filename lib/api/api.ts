import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // https://09-auth-two.vercel.app/api
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export * from "./clientApi";
