import React from "react";
import SidebarFile from "./SidebarFile";

function FileList({ notes }) {
  return (
    <div className="text-sm space-y-1 mt-1">
      {notes.map((note) => {
        return <SidebarFile key={note.id} note={note} />;
      })}
    </div>
  );
}

export default FileList;
