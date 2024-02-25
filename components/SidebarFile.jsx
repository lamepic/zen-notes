import { useNotes } from '@/lib/NotesProvider';
import { useRouter } from 'next/navigation';

function SidebarFile({ note }) {
  const router = useRouter();
  const { setShowSidebar } = useNotes();

  const handleClick = () => {
    setShowSidebar(false);
    router.replace(`/dashboard/${note.folderId}/${note.id}`);
  };

  return (
    <div className="text-black hover:bg-black/20 dark:text-gray-300 cursor-pointer hover:bg-slate-500 transition-all duration-200 ease-linear p-1">
      <button className="w-full text-left pl-9" onClick={handleClick}>
        {note.name}
      </button>
    </div>
  );
}

export default SidebarFile;
