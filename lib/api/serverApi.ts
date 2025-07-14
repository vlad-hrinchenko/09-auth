
import { api } from "./api";

export const getCurrentUser = async (cookie: string) => {
  const res = await api.get("/auth/session", {
    headers: { Cookie: cookie },
  });
  return res.data;
};