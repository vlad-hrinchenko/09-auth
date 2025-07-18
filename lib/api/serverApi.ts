import { cookies } from "next/headers";
import type { User, SessionResponseData } from "@/types/user";
import type { Note, FetchNotesResponse } from "@/types/note";
import { axiosConfig } from "./axiosConfig";
import type { AxiosResponse } from "axios";

// Отримати поточного користувача (тільки дані)
export const getCurrentUser = async (): Promise<User> => {
  const cookie = cookies().toString();

  const response = await axiosConfig.get<User>("/users/me", {
    headers: { Cookie: cookie },
  });

  return response.data;
};

// Перевірка сесії — ПОВЕРТАЄМО ПОВНИЙ ОБ’ЄКТ ВІДПОВІДІ AXIOS
export const checkSession = async (): Promise<AxiosResponse<SessionResponseData>> => {
  const cookie = cookies().toString();

  const response = await axiosConfig.get<SessionResponseData>("/auth/session", {
    headers: { Cookie: cookie },
  });

  return response;
};

// Отримати нотатки
export const fetchNotes = async (
  page = 1,
  perPage = 12,
  search = "",
  tag = ""
): Promise<FetchNotesResponse> => {
  const cookie = cookies().toString();

  const params: Record<string, string | number> = { page, perPage };
  if (search.trim()) params.search = search;
  if (tag && tag.toLowerCase() !== "all") params.tag = tag;

  const response = await axiosConfig.get<FetchNotesResponse>("/notes", {
    headers: { Cookie: cookie },
    params,
  });

  return response.data;
};

// Отримати нотатку за ID
export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookie = cookies().toString();

  const response = await axiosConfig.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookie },
  });

  return response.data;
};
