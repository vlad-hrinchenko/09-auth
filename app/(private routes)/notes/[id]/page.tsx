import { fetchNoteById } from "@/lib/api/clientApi";
import type { Metadata } from "next";
import type { Note } from "@/types/note";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // Передаємо id без перетворення на number
  const note: Note | null = await fetchNoteById(params.id);

  const title = note ? `${note.title} — NoteHub` : "Нотатка — NoteHub";
  const description =
    note?.content?.slice(0, 100) || "Деталі нотатки у NoteHub.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://your-site-url.com/notes/${params.id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
      ],
    },
  };
}
