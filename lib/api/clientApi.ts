import { api } from "./api";

export const getCurrentUser = async () => {
  const res = await api.get("/auth/session");
  return res.data;
};

export const registerUser = async (email: string, password: string) => {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return res.json();
};

export const loginUser = async (email: string, password: string) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Login failed");
  }

  return res.json();
};


export const logoutUser = async () => {
  await api.post("/auth/logout");
};

export const updateUserProfile = async ({ username }: { username: string }) => {
  const res = await api.patch("/users/me", { username });
  return res.data;
};

