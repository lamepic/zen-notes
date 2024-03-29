import { createContext, useContext, useState } from 'react';
import useSWR from 'swr';
import { getNote } from './services';

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const { data, isLoading } = useSWR(selectedNote ? `note-${selectedNote.id}` : null, () => getNote(selectedNote));
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <NotesContext.Provider
      value={{
        isLoading,
        setSelectedNote,
        setSelectedFolderId,
        selectedFolderId,
        selectedNote,
        data,
        showSidebar,
        setShowSidebar,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export const useNotes = () => useContext(NotesContext);
