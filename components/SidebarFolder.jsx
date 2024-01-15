"use client";
import {
  ChevronRight,
  Folder,
  FolderClosed,
  MoreVertical,
  Pencil,
  Save,
  Trash2,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

function SidebarFolder({ folder }) {
  const [editMode, setEditMode] = useState(false);
  const [openFolder, setOpenFolder] = useState(false);

  const handleSave = () => {
    setEditMode(false);
  };

  return (
    <>
      {!editMode ? (
        <div className="flex justify-between items-center px-5 py-3 cursor-pointer hover:bg-[#e5e5e5] dark:hover:bg-slate-900/70 duration-150 mb-1 transition-all">
          <button
            className="flex items-center gap-2"
            onClick={() => setOpenFolder(!openFolder)}
          >
            {!openFolder ? <Folder size={20} /> : <FolderClosed size={20} />}
            <p className="lg:text-sm">{folder.name}</p>
          </button>
          <div className="flex items-center">
            <FolderMenu>
              <IconButton className="flex items-center space-x-3">
                <Pencil className="text-green-500" size={20} />
                <p className="" onClick={() => setEditMode(true)}>
                  Edit
                </p>
              </IconButton>
              <IconButton className="flex items-center space-x-3">
                <Trash2 className="text-red-500" size={20} />
                <p className="">Delete</p>
              </IconButton>
            </FolderMenu>
            <ChevronRight
              onClick={() => setOpenFolder(!openFolder)}
              className={cn(
                "transition-all duration-100 ease-linear",
                openFolder ? "-rotate-90" : ""
              )}
            />
          </div>
        </div>
      ) : (
        <form className="flex gap-2 px-4">
          <Input className="flex-1 bg-white" />
          <button onClick={handleSave}>
            <Save size={25} />
          </button>
        </form>
      )}
    </>
  );
}

export default SidebarFolder;

const IconButton = ({ children, ...props }) => {
  const [left, right] = children;
  return (
    <button {...props}>
      {left}
      {right}
    </button>
  );
};

const FolderMenu = ({ children }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <MoreVertical />
      </PopoverTrigger>
      <PopoverContent className="w-36 mr-3 space-y-3">
        {children}
      </PopoverContent>
    </Popover>
  );
};
