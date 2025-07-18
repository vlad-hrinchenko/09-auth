// Тип для дозволених тегів нотаток
export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

// Одна нотатка
export type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
};

// Відповідь при запиті списку нотаток
export type FetchNotesResponse = {
  notes: Note[];
  total: number;
  totalPages: number;
  tag: string;
};

// Дані для створення нової нотатки
export type NewNoteData = {
  title: string;
  content: string;
  tag: NoteTag;
};

// Категорії (опціонально, якщо використовуються окремо)
export type Category = {
  id: string;
  name: string;
};

export interface SessionResponseData {
  valid: boolean;
}
