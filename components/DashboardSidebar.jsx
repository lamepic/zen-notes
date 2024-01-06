import React from "react";
import Logo from "./Logo";
import SidebarFolder from "./SidebarFolder";
import { Plus, X } from "lucide-react";
import ProfileIcon from "./ProfileIcon";
import ThemeToggle from "./ThemeToggle";

function DashboardSidebar({ setOpenSidebar }) {
  return (
    <div className="h-full flex flex-col">
      <section className="border-b dark:border-gray-500 p-5 flex items-center justify-between">
        <Logo />
        <X className="block lg:hidden" onClick={() => setOpenSidebar(false)} />
      </section>
      <section className="border-b dark:border-gray-500 text-lg">
        <button className="flex w-full items-center gap-2 p-5">
          <Plus size={25} />
          <span>Create Folder</span>
        </button>
      </section>
      <section className="overflow-y-auto flex-grow">
        {Array(5)
          .fill(0)
          .map((item, idx) => {
            return <SidebarFolder key={idx} />;
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
