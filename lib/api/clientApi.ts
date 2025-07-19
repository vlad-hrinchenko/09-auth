import type { Note, NewNote, NotesResponse } from "@/types/note";
import type { User, UserRequest, CheckSessionResponse } from "@/types/user";
import api from "./api";
import { AxiosError } from "axios";

// Notes

export const fetchNotes = async (
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
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (noteData: NewNote): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", noteData);
  return data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${noteId}`);
  return data;
};

// Auth

export const register = async (data: UserRequest): Promise<User> => {
  const response = await api.post<User>("/auth/register", data);
  return response.data;
};

export const login = async (data: UserRequest): Promise<User> => {
  const response = await api.post<User>("/auth/login", data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const { data, status } = await api.get<CheckSessionResponse>("/auth/session");
    return { success: status === 200, message: data.message };
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    if ([400, 401].includes(axiosError.response?.status || 0)) {
      return { success: false, message: axiosError.response?.data.message ?? "Unauthorized" };
    }
    throw error;
  }
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

export const updateUser = async (data: { username: string }): Promise<User> => {
  const { data: updated } = await api.patch<User>("/users/me", data);
  return updated;
};
