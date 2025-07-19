import type { Note, NewNote, NotesResponse } from "@/types/note";
import type { User, UserRequest, CheckSessionResponse } from "@/types/user";
import { AxiosError } from "axios";
import api from "./api";

export const fetchNotes = async (
  searchText: string,
  page = 1,
  perPage = 10,
  tag?: string
): Promise<NotesResponse> => {
  const { data } = await api.get("/notes", {
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
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

export const createNote = async (note: NewNote): Promise<Note> => {
  const { data } = await api.post("/notes", note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};

export const updateUserProfile = async (userData: { username: string }): Promise<User> => {
  const { data } = await api.patch("/users/me", userData);
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get("/users/me");
  return data;
};

export const register = async (data: UserRequest): Promise<User> => {
  const { data: user } = await api.post("/auth/register", data);
  return user;
};

export const login = async (data: UserRequest): Promise<User> => {
  const { data: user } = await api.post("/auth/login", data);
  return user;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const { data, status } = await api.get<CheckSessionResponse>("/auth/session");
    return { success: status === 200, message: data.message };
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    const message = axiosError.response?.data.message ?? "Session check failed";
    return { success: false, message };
  }
};
