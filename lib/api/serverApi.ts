import { cookies } from "next/headers";
import { nextServer } from "./api";
import type { Note, NotesResponse } from "@/types/note";
import type { User, CheckSessionResponse } from "@/types/user";

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
  const { data } = await nextServer.get<NotesResponse>("/notes", {
    params: {
      ...(searchText && { search: searchText }),
      page,
      perPage,
      ...(tag && tag !== "All" && { tag }),
    },
    headers: { Cookie: cookieHeader },
  });
  return data;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookieHeader = getCookieHeader();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieHeader },
  });
  return data;
};

export const getUserFromServer = async (): Promise<User> => {
  const cookieHeader = getCookieHeader();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: { Cookie: cookieHeader },
  });
  return data;
};

export const checkServerSession = async (): Promise<CheckSessionResponse> => {
  const cookieHeader = getCookieHeader();
  const { data } = await nextServer.get<CheckSessionResponse>("/auth/session", {
    headers: { Cookie: cookieHeader },
  });
  return data;
};
