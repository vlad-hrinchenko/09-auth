// Тип для дозволених тегів нотаток
export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";



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


export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}

export interface NewNote {
  title: string;
  content: string;
  tag: string;
}

export interface NotesResponse {
  notes: Note[];
  page: number;
  totalPages: number;
  tag: string;
}
