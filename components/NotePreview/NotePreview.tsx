"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import type { Note } from "@/types/note";

interface NotePreviewProps {
  noteId: number | string;
}

export default function NotePreview({ noteId }: NotePreviewProps) {
  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(String(noteId)), // Тут обов’язково String()
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading note...</p>;
  if (isError || !data) return <p>Error loading note.</p>;

  return (
    <article>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <p>Tag: {data.tag}</p>
    </article>
  );
}
