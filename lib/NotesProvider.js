import { createContext, useContext, useState } from "react";
import useSWR from "swr";
import { getNote } from "./services";

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const { data, isLoading } = useSWR(
    selectedNote ? `note-${selectedNote.id}` : null,
    () => getNote(selectedNote)
  );

  return (
    <NotesContext.Provider
      value={{ note: data, setSelectedNote, setSelectedFolder }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export const useNotes = () => useContext(NotesContext);
