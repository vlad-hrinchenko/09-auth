import axios from "axios";
import type { NotesResponse } from "@/types/note";

export const nextServer = axios.create({
  baseURL: "https://notehub-api.goit.study",
  withCredentials: true,
});

export const getNotes = async (categoryId?: string) => {
  const res = await nextServer.get<NotesResponse>("/notes", {
    params: { categoryId },
  });
  return res.data;
};
