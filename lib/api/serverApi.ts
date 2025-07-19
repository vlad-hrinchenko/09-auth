import { nextServer } from "./api";
import type { Note, NotesResponse } from "@/types/note";
import type { User } from "@/types/user";

export const fetchNotesServer = async (
  searchText: string,
  page = 1,
  perPage = 10,
  tag?: string
): Promise<NotesResponse> => {
  const res = await nextServer.get<NotesResponse>("/notes", {
    params: {
      ...(searchText && { search: searchText }),
      page,
      perPage,
      ...(tag && tag !== "All" && { tag }),
    },
  });
  return res.data;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export const getUserFromServer = async (): Promise<User> => {
  const res = await nextServer.get<User>("/users/me");
  return res.data;
};

export const checkServerSession = async () => {
  return await nextServer.get("/auth/session");
};
