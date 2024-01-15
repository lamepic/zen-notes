import { AlignJustify, Save, Trash } from "lucide-react";

function NoteEditorMenuBar({ name, setName, handleSaveNote }) {
  return (
    <div className="border-b p-5 lg:border-0 dark:border-gray-500 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <AlignJustify
          onClick={() => setShowSidebar(true)}
          className="lg:hidden"
        />
        <input
          className="font-semibold text-lg bg-transparent outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Save
          onClick={handleSaveNote}
          size={20}
          className="cursor-pointer text-green-500"
        />
        <Trash size={20} className="cursor-pointer text-red-500" />
      </div>
    </div>
  );
}

export default NoteEditorMenuBar;
