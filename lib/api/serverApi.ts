import { axiosConfig } from "./api";
import type { User, SessionResponseData } from "@/types/user";
import type { Note, FetchNotesResponse } from "@/types/note";
import { cookies } from "next/headers";
import type { AxiosResponse } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://notehub-api.goit.study";

function getCookieHeader() {
  const cookieStore = cookies();
  const cookie = cookieStore.toString();
  return cookie ? { Cookie: cookie } : {};
}

export const getCurrentUser = async (): Promise<AxiosResponse<User>> => {
  return await axiosConfig.get<User>(`${BASE_URL}/users/me`, {
    headers: getCookieHeader(),
  });
};

export const checkSession = async (): Promise<AxiosResponse<SessionResponseData>> => {
  return await axiosConfig.get<SessionResponseData>(`${BASE_URL}/auth/session`, {
    headers: getCookieHeader(),
  });
};

export const fetchNotes = async (
  page = 1,
  perPage = 12,
  search = "",
  tag = ""
): Promise<AxiosResponse<FetchNotesResponse>> => {
  const params: Record<string, string | number> = { page, perPage };
  if (search.trim()) params.search = search;
  if (tag && tag.toLowerCase() !== "all") params.tag = tag;

  return await axiosConfig.get<FetchNotesResponse>(`${BASE_URL}/notes`, {
    headers: getCookieHeader(),
    params,
  });
};

export const fetchNoteById = async (id: string): Promise<AxiosResponse<Note>> => {
  return await axiosConfig.get<Note>(`${BASE_URL}/notes/${id}`, {
    headers: getCookieHeader(),
  });
};
