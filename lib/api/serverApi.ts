import api from "./api";
import { cookies } from "next/headers";
import type { Note, NotesResponse } from "@/types/note";
import type { User } from "@/types/user";

const getCookieHeader = () => {
  const cookieStore = cookies();
  return cookieStore.toString();
};

export const fetchNotesServer = async (
  searchText: string,
  page = 1,
  perPage = 10,
  tag?: string
): Promise<NotesResponse> => {
  const cookieHeader = getCookieHeader();
  const { data } = await api.get<NotesResponse>("/notes", {
    headers: { Cookie: cookieHeader },
    params: {
      ...(searchText && { search: searchText }),
      page,
      perPage,
      ...(tag && tag !== "All" && { tag }),
    },
  });
  return data;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookieHeader = getCookieHeader();
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieHeader },
  });
  return data;
};

export const getUserFromServer = async (): Promise<User> => {
  const cookieHeader = getCookieHeader();
  const { data } = await api.get<User>("/users/me", {
    headers: { Cookie: cookieHeader },
  });
  return data;
};

export const checkServerSession = async () => {
  const cookieHeader = getCookieHeader();
  const { data } = await api.get("/auth/session", {
    headers: { Cookie: cookieHeader },
  });
  return data;
};
