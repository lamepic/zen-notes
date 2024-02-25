"use client";

import { useState } from "react";

import { mutate } from "swr";
import { useNotes } from "@/lib/NotesProvider";
import { deleteNote, saveNote } from "@/lib/services";
import { useToast } from "@/components/ui/use-toast";

import CustomEditor from "./CustomEditor";
import NoteEditorMenuBar from "../NoteEditorMenuBar";
import { useRouter } from "next/navigation";

function NoteEditor({ folderId, noteId, note }) {
  const _noteId = noteId === "new-note" ? null : noteId;
  const router = useRouter();
  const { toast } = useToast();
  const { setShowSidebar } = useNotes();
  const [name, setName] = useState(note?.name ?? "New Note");
  const [content, setContent] = useState(note?.content ?? "");

  const handleSaveNote = async () => {
    const newNote = { ...note, name, content, folderId };
    const noteId = await saveNote(newNote, _noteId);
    mutate(folderId);
    note && mutate(note.id);
    window.history.replaceState(null, "", `/dashboard/${folderId}/${noteId}`);
    toast({
      title: "Note Saved",
      description: `"${newNote.name}" has been saved`,
    });
  };

  const handleDeleteNote = async () => {
    await deleteNote(_noteId);
    router.replace("/dashboard/");
    mutate(folderId);
    toast({
      title: "Note Deleted",
      variant: "destructive",
      description: `${name} has been deleted`,
    });
  };

  const onEditorContentChange = (e) => {
    setContent(e);
  };

  return (
    <>
      <NoteEditorMenuBar
        name={name}
        setName={setName}
        handleSaveNote={handleSaveNote}
        setShowSidebar={setShowSidebar}
        handleDeleteNote={handleDeleteNote}
      />

      <CustomEditor
        onEditorContentChange={onEditorContentChange}
        noteContent={content}
      />
    </>
  );
}

export default NoteEditor;
