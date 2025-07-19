import { cookies } from "next/headers";
import type { Note, NotesResponse } from "@/types/note";
import type { User } from "@/types/user";
import api from "./api";

const getCookieHeader = (): string => {
  const cookieStore = cookies();
  return cookieStore.toString();
};

const getAuthHeaders = () => ({
  headers: {
    Cookie: getCookieHeader(),
  },
});

// Notes

export const fetchNotesServer = async (
  searchText = "",
  page = 1,
  perPage = 10,
  tag?: string
): Promise<NotesResponse> => {
  const { data } = await api.get<NotesResponse>("/notes", {
    params: {
      ...(searchText && { search: searchText }),
      page,
      perPage,
      ...(tag && tag !== "All" && { tag }),
    },
    ...getAuthHeaders(),
  });
  return data;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`, getAuthHeaders());
  return data;
};

// Auth

export const checkServerSession = async () => {
  const response = await api.get("/auth/session", getAuthHeaders());
  return response;
};

export const getUserFromServer = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/me", getAuthHeaders());
  return data;
};
