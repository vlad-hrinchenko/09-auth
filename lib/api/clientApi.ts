import type { Note, NewNote, NotesResponse } from "@/types/note";
import type { User, UserRequest, CheckSessionResponse } from "@/types/user";
import { nextServer } from "./api";
import { AxiosError } from "axios";

// Notes
export const fetchNotes = async (
  searchText: string,
  page = 1,
  perPage = 10,
  tag?: string
): Promise<NotesResponse> => {
  const { data } = await nextServer.get<NotesResponse>("/notes", {
    params: {
      ...(searchText && { search: searchText }),
      page,
      perPage,
      ...(tag && tag !== "All" && { tag }),
    },
  });
  return data;
};

export const createNote = async (noteData: NewNote): Promise<Note> => {
  const { data } = await nextServer.post<Note>("/notes", noteData);
  return data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${noteId}`);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
};

// Auth
export const register = async (data: UserRequest): Promise<User> => {
  const { data: user } = await nextServer.post<User>("/auth/register", data);
  return user;
};

export const login = async (data: UserRequest): Promise<User> => {
  const { data: user } = await nextServer.post<User>("/auth/login", data);
  return user;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const checkSession = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const { data, status } = await nextServer.get<CheckSessionResponse>("/auth/session");
    return { success: status === 200, message: data.message };
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (axiosError.response?.status === 400 || axiosError.response?.status === 401) {
      return { success: false, message: axiosError.response.data.message };
    }
    throw error;
  }
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const updateUserProfile = async (data: { username: string }): Promise<User> => {
  const { data: user } = await nextServer.patch<User>("/users/me", data);
  return user;
};
