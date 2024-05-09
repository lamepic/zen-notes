import { useEffect, useState } from 'react';

import debounce from 'lodash.debounce';

import { deleteNote, getNote } from '@/services/note';
import { useNote } from '@/providers/NoteProvider';
import { ChevronLeft, SidebarIcon, Trash } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';

type ProptType = {
    handleToggleContentWidth: () => void;
    handleToggleSidebar: () => void;
};

function TopNav({ handleToggleContentWidth, handleToggleSidebar }: ProptType) {
    const { selectedNote, setSelectedNote, updateSelectedNote } = useNote();
    const [noteName, setNoteName] = useState<string>('');
    const note = useLiveQuery(
        () => getNote(selectedNote?.id ?? '1'),
        [selectedNote?.id]
    );

    useEffect(() => {
        setNoteName(selectedNote?.name);
    }, [selectedNote]);

    const handleDelete = async () => {
        await deleteNote(selectedNote.id);
        setSelectedNote(null);
    };

    const handleUpdate = (e: React.FormEvent<HTMLInputElement>) => {
        setNoteName(e.currentTarget.value);
        debounced(e.currentTarget.value);
    };

    const debounced = debounce(async (val) => {
        if (val.length === 0 && val === selectedNote?.name) return;
        await updateSelectedNote({ name: val, content: note?.content });
    }, 1000);

    if (!selectedNote) return null;

    return (
        <div className="flex justify-between items-center">
            <div className="flex space-x-3 md:space-x-0 items-center md:w-6/12 xl:w-5/12">
                <ChevronLeft
                    onClick={handleToggleSidebar}
                    className="md:hidden"
                />
                {noteName?.length > 0 && (
                    <input
                        // disabled={!selectedNote}
                        value={noteName}
                        onChange={handleUpdate}
                        className="font-bold text-xl capitalize bg-transparent outline-none border-none w-full"
                    />
                )}
            </div>

            <div className="flex items-center space-x-3">
                <SidebarIcon
                    onClick={handleToggleContentWidth}
                    className="hidden md:block cursor-pointer"
                    size={20}
                />
                <button onClick={handleDelete} disabled={!selectedNote}>
                    <Trash size={20} />
                </button>
            </div>
        </div>
    );
}

export default TopNav;
