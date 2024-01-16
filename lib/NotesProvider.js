import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { getNote } from "./services";

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const { data, isLoading } = useSWR(
    selectedNote ? `note-${selectedNote.id}` : null,
    () => getNote(selectedNote)
  );

  // useEffect(() => {
  //   setSelectedNote(data);
  // }, [data]);

  return (
    <NotesContext.Provider
      value={{
        isLoading,
        setSelectedNote,
        setSelectedFolderId,
        selectedFolderId,
        selectedNote,
        data,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export const useNotes = () => useContext(NotesContext);
