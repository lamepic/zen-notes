import { Skeleton } from '@/components/ui/skeleton';

function NoteEditorLoader() {
  return (
    <div className="flex flex-col space-y-10 p-5 h-full">
      <Skeleton className="h-12 w-full bg-slate-300/10" />
      <Skeleton className="h-full w-full bg-slate-300/10" />
    </div>
  );
}

export default NoteEditorLoader;
