import { useEffect, useState } from 'react';

import debounce from 'lodash.debounce';

import { deleteNote } from '@/services/note';
import { useNote } from '@/providers/NoteProvider';
import { ChevronLeft, SidebarIcon, Trash } from 'lucide-react';

type ProptType = {
    handleToggleContentWidth: () => void;
    handleToggleSidebar: () => void;
};

function TopNav({ handleToggleContentWidth, handleToggleSidebar }: ProptType) {
    const { selectedNote, setSelectedNote, updateSelectedNote } = useNote();
    const [noteName, setNoteName] = useState<string>('hello');

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
        await updateSelectedNote({ name: val });
    }, 1000);

    if (!selectedNote) return null;

    return (
        <div className="flex justify-between items-center">
            <div className="flex space-x-3 md:space-x-0 items-center w-3/12">
                <ChevronLeft
                    onClick={handleToggleSidebar}
                    className="md:hidden"
                />
                <input
                    // disabled={!selectedNote}
                    value={noteName}
                    onChange={handleUpdate}
                    className="font-bold text-xl capitalize bg-transparent outline-none border-none w-full"
                />
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
