import { useNotes } from "@/lib/NotesProvider";
import React from "react";

function SidebarFile({ note }) {
  const { setSelectedNote } = useNotes();
  return (
    <div className="text-black hover:bg-black/20 dark:text-gray-300 cursor-pointer hover:bg-slate-500 transition-all duration-200 ease-linear p-1 pl-9">
      <button
        className="w-full text-left"
        onClick={() => setSelectedNote(note)}
      >
        {note.name}
      </button>
    </div>
  );
}

export default SidebarFile;
