import { cn } from '@/lib/utils';
import { useNote } from '@/providers/NoteProvider';
import { createNote, getNote, getNotes } from '@/services/note';
import { useLiveQuery } from 'dexie-react-hooks';

type PropType = {
    show: boolean;
    folderId: string;
};

function FolderContent({ show, folderId }: PropType) {
    const { selectedNote, setSelectedNote } = useNote();
    const notes = useLiveQuery(() => getNotes(folderId));

    const addNote = async () => {
        const id = await createNote({
            name: 'Untitled',
            content: '',
            folderId,
        });
        const note = await getNote(id);
        setSelectedNote(note);
    };

    return (
        <div
            className={cn(
                'transition-all duration-200 ease space-y-1',
                show ? 'block' : 'hidden'
            )}
        >
            <button
                onClick={addNote}
                className="text-gray-400 text-sm mt-1 w-full text-start pl-6"
            >
                Add note...
            </button>
            {notes?.map((note) => {
                return (
                    <button
                        onClick={() => setSelectedNote(note)}
                        key={note.id}
                        className="hover:bg-slate-600/50 transition-all duration-300 pl-6 pr-1 py-1 ease text-sm cursor-pointer rounded w-full text-start"
                    >
                        <span className="line-clamp-1">{note.name}</span>
                    </button>
                );
            })}
        </div>
    );
}

export default FolderContent;
