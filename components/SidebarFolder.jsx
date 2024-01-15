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
import { deleteFolder, getNotes, updateFolder } from "@/lib/services";
import useSWR, { useSWRConfig } from "swr";
import FileList from "./FileList";

function SidebarFolder({ folder }) {
  const [editMode, setEditMode] = useState(false);
  const [openFolder, setOpenFolder] = useState(false);
  const [folderName, setFolderName] = useState(folder.name);
  const { mutate } = useSWRConfig();
  const { data, isLoading } = useSWR(folder ? `notes-${folder.id}` : null, () =>
    getNotes(folder)
  );

  const handleDelete = async () => {
    await deleteFolder(folder);
    mutate("getFolders");
  };

  const handleUpdateFolder = async (e) => {
    e.preventDefault();
    if (folderName === folder.name) {
      setEditMode(false);
      return;
    }
    await updateFolder({ name: folderName, id: folder.id });
    mutate("getFolders");
    setEditMode(false);
  };

  return (
    <>
      {!editMode ? (
        <div className="transition-all ease-linear duration-300">
          <div className="flex justify-between items-center px-3 py-1 cursor-pointer hover:bg-[#e5e5e5] dark:hover:bg-slate-900/70 duration-150 mb-1 transition-all">
            <button
              className="flex items-center gap-2 w-full py-2"
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
                <IconButton
                  className="flex items-center space-x-3"
                  onClick={handleDelete}
                >
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
          {openFolder && (
            <div className="-mt-1">
              <button className="text-gray-500 text-left text-sm w-full pl-10">
                Add note...
              </button>
              {!isLoading && <FileList notes={data} />}
            </div>
          )}
        </div>
      ) : (
        <form className="flex gap-2 px-4 mt-3 items-center">
          <Folder size={20} />
          <Input
            className="flex-1 px-2 border border-gray-500"
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <button onClick={handleUpdateFolder}>
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
