import { cookies } from "next/headers";
import type { User, SessionResponseData } from "@/types/user";
import type { Note, FetchNotesResponse } from "@/types/note";

// SSR: Отримати поточного користувача
export const getCurrentUser = async (): Promise<User> => {
  const cookie = cookies().toString();
  const response = await fetch("http://localhost:3000/api/users/me", {
    headers: { Cookie: cookie },
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Unable to fetch user");
  return await response.json();
};

// SSR: Перевірка сесії
export const checkSession = async (): Promise<SessionResponseData> => {
  const cookie = cookies().toString();
  const response = await fetch("http://localhost:3000/api/auth/session", {
    headers: { Cookie: cookie },
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Session check failed");
  return await response.json();
};

// SSR: Отримати нотатки
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
  if (search) params.set("search", search);
  if (tag && tag.toLowerCase() !== "all") params.set("tag", tag);

  const response = await fetch(`http://localhost:3000/api/notes?${params.toString()}`, {
    headers: { Cookie: cookie },
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Failed to fetch notes");
  return await response.json();
};

// SSR: Отримати нотатку за ID
export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookie = cookies().toString();
  const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
    headers: { Cookie: cookie },
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Note not found");
  return await response.json();
};
