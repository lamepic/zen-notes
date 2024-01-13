"use client";

import React, { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { cn } from "@/lib/utils";
import { AlignJustify, Trash } from "lucide-react";
import NoteEditor from "@/components/NoteEditor";
import { useAuth } from "@/lib/auth";

function DashboardPage() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { user } = useAuth();

  console.log(user);

  return (
    <div className="h-full lg:border dark:border-gray-500 lg:w-10/12 lg:h-5/6 m-auto rounded-md lg:flex relative">
      <div
        className={cn(
          "absolute lg:relative w-full h-full lg:-translate-x-0 top-0 left-0 border-r dark:border-gray-500 lg:flex-[0.23] z-20 transition-all duration-200 ease-in-out",
          !showSidebar ? "-translate-x-full" : "bg-[var(--background)]" //
        )}
      >
        <DashboardSidebar setOpenSidebar={setShowSidebar} />
      </div>
      <div className="lg:flex-[0.77]">
        <NoteEditor setShowSidebar={setShowSidebar} />
      </div>
    </div>
  );
}

export default DashboardPage;
