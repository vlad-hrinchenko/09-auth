import { axiosConfig } from "../api/axiosConfig";
import type { User, RegisteredUser, CreateUserData, SessionResponseData } from "@/types/user";
import type { Note, NewNoteData, FetchNotesResponse } from "@/types/note";

export const register = async (payload: CreateUserData) => {
  const { data } = await axiosConfig.post<RegisteredUser>("/auth/register", payload);
  return data;
};

export const login = async (payload: CreateUserData) => {
  const { data } = await axiosConfig.post<User>("/auth/login", payload);
  return data;
};

export const logout = async () => {
  await axiosConfig.post("/auth/logout");
};

export const getUser = async () => {
  const { data } = await axiosConfig.get<User>("/users/me");
  return data;
};

export const updateUserProfile = async (updateUserData: Partial<User>) => {
  const { data } = await axiosConfig.patch<User>("/users/update", updateUserData);
  return data;
};

export const checkSession = async () => {
  const { data } = await axiosConfig.get<SessionResponseData>("/auth/session");
  return data;
};

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
  tag = "",
}: {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page, perPage };
  if (search.trim()) params.search = search;
  if (tag && tag.toLowerCase() !== "all") params.tag = tag;

  const { data } = await axiosConfig.get<FetchNotesResponse>("/notes", { params });
  return data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const { data } = await axiosConfig.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: NewNoteData): Promise<Note> => {
  const { data } = await axiosConfig.post<Note>("/notes", note);
  return data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const { data } = await axiosConfig.delete<Note>(`/notes/${id}`);
  return data;
};
