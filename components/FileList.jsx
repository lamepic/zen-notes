import useSWR from 'swr';
import SidebarFile from './SidebarFile';
import { getNotes } from '@/lib/services';
import { Skeleton } from './ui/skeleton';

function FileList({ folderId }) {
  const { data, isLoading } = useSWR(folderId, () => getNotes(folderId));

  return (
    <div className="text-sm space-y-1 mt-1">
      {!isLoading ? (
        data.map((note) => {
          return <SidebarFile key={note.id} note={note} />;
        })
      ) : (
        <div className="space-y-1">
          <Skeleton className="h-5 ml-9 w-10/12 bg-slate-300/10" />
          <Skeleton className="h-5 ml-9 w-10/12 bg-slate-300/10" />
        </div>
      )}
    </div>
  );
}

export default FileList;
