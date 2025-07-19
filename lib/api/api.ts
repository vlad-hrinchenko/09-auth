import axios from "axios";
import type { NotesResponse } from "@/types/note";

export const nextServer = axios.create({
  baseURL: "https://09-auth-two.vercel.app/",
  withCredentials: true,
});

export const getNotes = async (categoryId?: string) => {
  const res = await nextServer.get<NotesResponse>("/notes", {
    params: { categoryId },
  });
  return res.data;
};
