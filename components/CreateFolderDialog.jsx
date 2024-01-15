"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useAuth } from "@/lib/auth";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createFolder } from "@/lib/services";
import { useState } from "react";
import { useSWRConfig } from "swr";

function CreateFolderDialog({ children }) {
  const { user } = useAuth();
  const [folderName, setFolderName] = useState();
  const { mutate } = useSWRConfig();

  const handleCreateFolder = async (e) => {
    e.preventDefault();
    if (folderName.length === 0) {
      return;
    }
    const res = await createFolder({ name: folderName, userId: user.id });
    mutate("getFolders");
  };

  return (
    <Dialog className="w-full">
      <DialogTrigger className="w-full p-5">{children}</DialogTrigger>
      <DialogContent>
        <form className="w-full" onSubmit={handleCreateFolder}>
          <DialogHeader className="space-y-5">
            <DialogTitle className="text-3xl text-center">
              Create Folder
            </DialogTitle>
            <DialogDescription className="flex flex-col items-center py-5 space-y-2 font-bold">
              <Input
                placeholder="Folder name"
                className="border border-gray-200"
                type="text"
                name="folderName"
                onChange={(e) => setFolderName(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button className="w-full font-bold" type="submit">
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateFolderDialog;
