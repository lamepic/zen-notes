"use client";
import React from "react";
import Logo from "./Logo";
import SidebarFolder from "./SidebarFolder";
import { Plus, X } from "lucide-react";
import ProfileIcon from "./ProfileIcon";
import ThemeToggle from "./ThemeToggle";
import CreateFolderDialog from "./CreateFolderDialog";
import { Button } from "./ui/button";
import { getFolders } from "@/lib/services";
import useSWR from "swr";
import { useAuth } from "@/lib/auth";

function DashboardSidebar({ setOpenSidebar }) {
  const { user } = useAuth();
  const { data, error, isLoading } = useSWR("getFolders", () =>
    getFolders(user.id)
  );

  return (
    <div className="h-full flex flex-col">
      <section className="border-b dark:border-gray-500 p-5 flex items-center justify-between">
        <Logo />
        <X className="block lg:hidden" onClick={() => setOpenSidebar(false)} />
      </section>
      <section className="border-b dark:border-gray-500 text-lg ">
        <CreateFolderDialog>
          <Button className="flex w-full gap-2 p-5">
            <Plus size={25} />
            Create Folder
          </Button>
        </CreateFolderDialog>
      </section>
      <section className="overflow-y-auto flex-grow">
        {!isLoading &&
          data.map((folder, idx) => {
            return <SidebarFolder key={folder.id} folder={folder} />;
          })}
      </section>
      <section className="p-4 mt-1 border-t dark:border-gray-500 shadow-sm flex justify-between items-center">
        <ProfileIcon />
        <ThemeToggle />
      </section>
    </div>
  );
}

export default DashboardSidebar;
