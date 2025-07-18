"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api/clientApi";
import type { Note, FetchNotesResponse } from "@/types/note";

interface NotesClientProps {
  notes: Note[];
  totalPages: number;
  total: number;
  tag: string;
}

export default function NotesClient({
  notes,
  totalPages,
  total,
  tag,
}: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 300);

  const trimmedSearch = debouncedSearchText.trim();
  const tagForQuery = tag === "All" ? undefined : tag;

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, trimmedSearch, tagForQuery],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: trimmedSearch,
        tag: tagForQuery,
      }),
    placeholderData: keepPreviousData,
    initialData: {
      notes,
      totalPages,
      total,
      tag,
    },
  });

  return (
    <div>
      <header>
        <SearchBox
          value={searchText}
          onChange={(value: string) => {
            setSearchText(value);
            setPage(1);
          }}
        />
        {!!data?.totalPages && data.totalPages > 1 && (
          <Pagination
            page={page}
            pageCount={data.totalPages}
            onPageChange={setPage}
          />
        )}
        <Link href="/notes/action/create">
          <button>Create note +</button>
        </Link>
      </header>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Error loading notes.</p>}
      {data?.notes?.length ? (
        <NoteList notes={data.notes} />
      ) : (
        !isLoading && <p>No notes found.</p>
      )}
    </div>
  );
}
