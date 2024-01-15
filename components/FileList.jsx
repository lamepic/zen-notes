import React from "react";
import SidebarFile from "./SidebarFile";
import useSWR from "swr";
import { getFiles } from "@/lib/services";

function FileList({ notes }) {
  return (
    <div className="text-sm space-y-1 mt-1">
      {notes.map((note, idx) => {
        return <SidebarFile key={note.id} note={note} />;
      })}
    </div>
  );
}

export default FileList;
