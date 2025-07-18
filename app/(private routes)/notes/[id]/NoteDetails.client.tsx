"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import type { Note } from "@/types/note";

interface NoteDetailsClientProps {
  noteId: number; // noteId приходить як number
}

export default function NoteDetailsClient({ noteId }: NoteDetailsClientProps) {
  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(String(noteId)), // перетворюємо number у string
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading note details...</p>;
  if (isError || !data) return <p>Error loading note details.</p>;

  return (
    <article>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <p>
        <strong>Tag:</strong> {data.tag}
      </p>
    </article>
  );
}
