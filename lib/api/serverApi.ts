import { api } from "./api"; 
import { cookies } from "next/headers";
import { User } from "@/types/user";
import { Note, NotesResponse } from "@/types/note";

const getCookieHeader = async (): Promise<string> => {
  const cookieStore = cookies(); 
  return cookieStore.toString();
};

export const getUserFromServer = async (): Promise<User> => {
  const cookieHeader = await getCookieHeader();
  const { data } = await api.get<User>("/api/users/me", {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return data;
};

export const checkServerSession = async () => {
  const cookieHeader = await getCookieHeader();
  const response = await api.get("/api/auth/session", {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return response;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookieHeader = await getCookieHeader();
  const { data } = await api.get<Note>(`/api/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return data;
};

export const fetchNotesServer = async (
  searchText: string,
  page = 1,
  perPage = 10,
  tag?: string
): Promise<NotesResponse> => {
  const cookieHeader = await getCookieHeader();
  const { data } = await api.get<NotesResponse>("/api/notes", {
    params: {
      ...(searchText !== "" && { search: searchText }),
      page,
      perPage,
      ...(tag && tag !== "All" && { tag }),
    },
    headers: {
      Cookie: cookieHeader,
    },
  });

  return data;
};
