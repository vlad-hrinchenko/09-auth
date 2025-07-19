import { fetchNoteById } from "@/lib/api/clientApi";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import PreviewClient from "./NotePreview.client";

interface Props {
  params: Promise<{ id: string }>;
}

const NoteDetailsModal = async ({ params }: Props) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PreviewClient noteId={id} />
    </HydrationBoundary>
  );
};

export default NoteDetailsModal;
