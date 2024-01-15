import { createContext, useContext, useState } from "react";
import useSWR from "swr";
import { getNote } from "./services";

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [selectedFolder, setSelectedFolder] = useState();
  const [selectedNote, setSelectedNote] = useState(null);
  const { data, isLoading } = useSWR(selectedNote ? "notes" : null, () =>
    getNote(selectedNote)
  );

  return (
    <NotesContext.Provider value={{ note: data, setSelectedNote }}>
      {children}
    </NotesContext.Provider>
  );
}

export const useNotes = () => useContext(NotesContext);
