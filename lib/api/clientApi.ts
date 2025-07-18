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
import type { AxiosResponse } from "axios";

// 🔐 Реєстрація користувача
export const register = async (
  payload: CreateUserData
): Promise<RegisteredUser> => {
  const { data } = await axiosConfig.post<RegisteredUser>("/auth/register", payload);
  return data;
};

// 🔐 Логін користувача
export const login = async (payload: CreateUserData): Promise<User> => {
  const { data } = await axiosConfig.post<User>("/auth/login", payload);
  return data;
};

// 🚪 Вихід із системи
export const logout = async (): Promise<void> => {
  await axiosConfig.post("/auth/logout");
};

// 👤 Отримати дані поточного користувача
export const getUser = async (): Promise<User> => {
  const { data } = await axiosConfig.get<User>("/users/me");
  return data;
};

// 👤 Оновити профіль користувача
export const updateUserProfile = async (
  updateUserData: Partial<User>
): Promise<User> => {
  const { data } = await axiosConfig.patch<User>("/users/me", updateUserData);
  return data;
};

// 🔍 Перевірити сесію користувача
export const checkSession = async (): Promise<AxiosResponse<SessionResponseData>> => {
  return axiosConfig.get<SessionResponseData>("/auth/session");
};

// 🗒 Отримати список нотаток із параметрами
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
export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axiosConfig.get<Note>(`/notes/${id}`);
  return data;
};

// ➕ Створити нову нотатку
export const createNote = async (note: NewNoteData): Promise<Note> => {
  const { data } = await axiosConfig.post<Note>("/notes", note);
  return data;
};

// ❌ Видалити нотатку за ID
export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axiosConfig.delete<Note>(`/notes/${id}`);
  return data;
};
