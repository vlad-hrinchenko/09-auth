import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api/clientApi";
import type { Metadata } from "next";
import type { FetchNotesResponse } from "@/types/note";

interface Props {
  params: { slug?: string[] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = params.slug?.[0] || "All";

  const title = `Фільтр: ${tag} — NoteHub`;
  const description = `Переглядайте нотатки з тегом ${tag} у застосунку NoteHub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://your-site-url.com/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
      ],
    },
  };
}

export default async function NotesByTagPage({ params }: Props) {
  const tag = params.slug?.[0] || "All";

  const data: FetchNotesResponse = await fetchNotes({
    page: 1,
    perPage: 12,
    search: "",
    tag: tag === "All" ? "" : tag,
  });

  return (
    <NotesClient
      notes={data.notes}
      totalPages={data.totalPages}
      total={data.total}
      tag={tag}
    />
  );
}
