import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import PreviewClient from "./NotePreview.client";
import { fetchNoteByIdServer } from "@/lib/api/serverApi"; // ✅ серверний запит з куками

interface Props {
  params: { id: string };
}

const NoteDetailsModal = async ({ params }: Props) => {
  const { id } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteByIdServer(id), // ✅ серверний запит
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PreviewClient noteId={id} />
    </HydrationBoundary>
  );
};

export default NoteDetailsModal;
