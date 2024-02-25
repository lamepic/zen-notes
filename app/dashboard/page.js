"use client";

import Image from "next/image";

import { useNotes } from "@/lib/NotesProvider";
import { AlignJustify } from "lucide-react";

function DashboardPage() {
  const { setShowSidebar } = useNotes();
  return (
    <div className="h-full">
      <p className="pl-5 pt-5">
        <AlignJustify
          onClick={() => setShowSidebar(true)}
          className="lg:hidden"
        />
      </p>
      <div className="h-5/6 w-full grid place-items-center text-3xl font-bold">
        <div className="flex flex-col items-center gap-5">
          <Image
            src="notebook.svg"
            height={300}
            width={300}
            draggable={false}
            alt="add-note"
            priority
          />
          <p className="text-sm text-gray-400">
            Create a note and start writing
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
