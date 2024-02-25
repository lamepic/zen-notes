import { cn } from "@/lib/utils";

import { useNotes } from "@/lib/NotesProvider";
import DashboardSidebar from "./DashboardSidebar";

function DashboardLayout({ children }) {
  const { showSidebar, setShowSidebar } = useNotes();
  return (
    <div className="h-full lg:border dark:border-gray-500 lg:w-10/12 lg:h-[80%] m-auto rounded-md lg:flex">
      <div
        className={cn(
          "absolute lg:relative w-full h-full lg:-translate-x-0 top-0 left-0 md:border-r dark:border-gray-500 lg:flex-[0.23] z-20 transition-all duration-200 ease-in-out",
          !showSidebar ? "-translate-x-full" : "bg-[var(--background)]" //
        )}
      >
        <DashboardSidebar setOpenSidebar={setShowSidebar} />
      </div>
      <div className="lg:flex-[0.77]">{children}</div>
    </div>
  );
}

export default DashboardLayout;
