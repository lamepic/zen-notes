'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useSWRConfig } from 'swr';
import { Input } from './ui/input';
import { useAuth } from '@/lib/auth';
import { Button } from './ui/button';
import { slugify } from '@/lib/utils';
import { createFolder } from '@/lib/services';

function CreateFolderDialog({ children }) {
  const { user } = useAuth();
  const { mutate } = useSWRConfig();
  const [folderName, setFolderName] = useState();

  const handleCreateFolder = async (e) => {
    e.preventDefault();
    if (folderName.length === 0) {
      return;
    }
    await createFolder({
      name: folderName,
      userId: user.id,
      slug: slugify(folderName),
    });
    mutate('getFolders');
  };

  return (
    <Dialog className="w-full">
      <DialogTrigger className="w-full p-5 flex gap-3 justify-center">{children}</DialogTrigger>
      <DialogContent className="w-11/12 md:w-full rounded-lg">
        <form className="w-full" onSubmit={handleCreateFolder}>
          <DialogHeader className="space-y-5">
            <DialogTitle className="text-3xl text-center">Create Folder</DialogTitle>
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
            <Button className="w-full font-bold" type="submit" asChild>
              <DialogClose>Save</DialogClose>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateFolderDialog;
