import { nextServer } from "./api";
import { cookies } from "next/headers";
import type { Note, NotesResponse } from "@/types/note";
import type { User } from "@/types/user";

const getCookieHeader = async () => {
  const cookieStore = cookies();
  return cookieStore.toString();
};

export const fetchNotesServer = async (
  searchText: string,
  page = 1,
  perPage = 10,
  tag?: string
): Promise<NotesResponse> => {
  const cookie = await getCookieHeader();
  const res = await nextServer.get<NotesResponse>("/notes", {
    params: {
      ...(searchText && { search: searchText }),
      page,
      perPage,
      ...(tag && tag !== "All" && { tag }),
    },
    headers: {
      Cookie: cookie,
    },
  });
  return res.data;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookie = await getCookieHeader();
  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookie,
    },
  });
  return res.data;
};

export const getUserFromServer = async (): Promise<User> => {
  const cookie = await getCookieHeader();
  const res = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookie,
    },
  });
  return res.data;
};

export const checkServerSession = async () => {
  const cookie = await getCookieHeader();
  return await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookie,
    },
  });
};
