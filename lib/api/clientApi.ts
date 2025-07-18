import { axiosConfig } from "../api/api";
import type {
  User,
  RegisteredUser,
  CreateUserData,
  SessionResponseData,
} from "@/types/user";
import type {
  Note,
  NewNoteData,
  FetchNotesResponse,
} from "@/types/note";

// 🔐 Реєстрація
export const register = async (payload: CreateUserData) => {
  const { data } = await axiosConfig.post<RegisteredUser>("/auth/register", payload);
  return data;
};

// 🔐 Логін
export const login = async (payload: CreateUserData) => {
  const { data } = await axiosConfig.post<User>("/auth/login", payload);
  return data;
};

// 🚪 Логаут
export const logout = async () => {
  await axiosConfig.post("/auth/logout");
};

// 👤 Отримати поточного користувача
export const getUser = async () => {
  const { data } = await axiosConfig.get<User>("/users/me");
  return data;
};

// 👤 Оновлення профілю
export const updateUserProfile = async (updateUserData: Partial<User>) => {
  // Виправлено URL з /users/update на /users/me
  const { data } = await axiosConfig.patch<User>("/users/me", updateUserData);
  return data;
};

// 🔍 Перевірка сесії
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

// 🗒 Отримати нотатку за ID
// Змінено id тип на string
export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axiosConfig.get<Note>(`/notes/${id}`);
  return data;
};

// ➕ Створити нотатку
export const createNote = async (note: NewNoteData): Promise<Note> => {
  const { data } = await axiosConfig.post<Note>("/notes", note);
  return data;
};

// ❌ Видалити нотатку
// Змінено id тип на string
export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axiosConfig.delete<Note>(`/notes/${id}`);
  return data;
};
