import { api } from "./api";

export const getCurrentUser = async () => {
  const res = await api.get("/auth/session");
  return res.data;
};

export const registerUser = async (email: string, password: string) => {
  const res = await api.post("/auth/register", { email, password });
  return res.data;
};

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const logoutUser = async () => {
  await api.post("/auth/logout");
};

export const updateUserProfile = async ({ username }: { username: string }) => {
  const res = await api.patch("/users/me", { username });
  return res.data;
};

