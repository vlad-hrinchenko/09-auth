import { cookies } from "next/headers";
import type { User, SessionResponseData } from "@/types/user";
import type { Note, FetchNotesResponse } from "@/types/note";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://notehub-api.goit.study";

export const getCurrentUser = async (): Promise<User> => {
  const cookie = cookies().toString();
  const response = await fetch(`${BASE_URL}/users/me`, {
    headers: { Cookie: cookie },
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Unable to fetch user");
  return response.json();
};

export const checkSession = async (): Promise<SessionResponseData> => {
  const cookie = cookies().toString();
  const response = await fetch(`${BASE_URL}/auth/session`, {
    headers: { Cookie: cookie },
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Session check failed");
  return response.json();
};

export const fetchNotes = async (
  page = 1,
  perPage = 12,
  search = "",
  tag = ""
): Promise<FetchNotesResponse> => {
  const cookie = cookies().toString();
  const params = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
  });
  if (search.trim()) params.set("search", search.trim());
  if (tag.trim() && tag.toLowerCase() !== "all") params.set("tag", tag.trim());

  const response = await fetch(`${BASE_URL}/notes?${params.toString()}`, {
    headers: { Cookie: cookie },
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Failed to fetch notes");
  return response.json();
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookie = cookies().toString();
  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    headers: { Cookie: cookie },
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Note not found");
  return response.json();
};
