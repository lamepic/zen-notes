import { ScrollArea } from '../ui/scroll-area';
import { useLiveQuery } from 'dexie-react-hooks';

import Folder from '../NoteFolder/Folder';
import AddFolder from '../NoteFolder/AddFolder';

import { getFolders } from '@/services/folder';

function SidebarContent() {
    const folders = useLiveQuery(getFolders);

    return (
        <div className="flex flex-col h-[calc(100%-120px)]">
            <ScrollArea className="px-5 h-full flex-grow overflow-y-auto">
                {folders?.map((folder) => (
                    <Folder key={folder.id} folder={folder} />
                ))}
            </ScrollArea>
            <AddFolder />
        </div>
    );
}

export default SidebarContent;
