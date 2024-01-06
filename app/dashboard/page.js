"use client";
import React, { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { cn } from "@/lib/utils";
import { AlignJustify, Trash } from "lucide-react";

function DashboardPage() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="h-full lg:border dark:border-gray-500 lg:w-10/12 lg:h-5/6 m-auto rounded-md lg:flex relative">
      <div
        className={cn(
          "absolute lg:relative w-full h-full lg:-translate-x-0 top-0 left-0 border-r dark:border-gray-500 lg:flex-[0.23] z-20 transition-all duration-200 ease-in-out",
          !showSidebar ? "-translate-x-full" : "bg-white"
        )}
      >
        <DashboardSidebar setOpenSidebar={setShowSidebar} />
      </div>
      <div className="lg:flex-[0.77]">
        <div className="p-5 border-b lg:border-0 dark:border-gray-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlignJustify
              onClick={() => setShowSidebar(true)}
              className="lg:hidden"
            />
            <p className="font-semibold text-lg">Note Title</p>
          </div>
          <Trash size={20} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
