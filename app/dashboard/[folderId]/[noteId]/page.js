"use client";

import useSWR from "swr";

import { getNote } from "@/lib/services";
import { useParams } from "next/navigation";

import NoteEditor from "@/components/Editor/NoteEditor";
import NoteEditorLoader from "@/components/Loader/NoteEditorLoader";

function NotePage() {
  const { folderId, noteId } = useParams();
  const { data, isLoading } = useSWR(noteId, () => getNote(noteId));

  return (
    <>
      {!isLoading ? (
        <NoteEditor folderId={folderId} noteId={noteId} note={data} />
      ) : (
        <NoteEditorLoader />
      )}
    </>
  );
}

export default NotePage;
