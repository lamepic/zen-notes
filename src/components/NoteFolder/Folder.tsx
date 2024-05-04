import React, { useState } from 'react';
import { ChevronDown, Folder as FolderIcon, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import FolderDropdown from './FolderDropdown';
import FolderContent from './FolderContent';
import { updateFolder } from '@/services/folder';

type PropType = {
    folder: {
        id?: string;
        name: string;
    };
};

function Folder({ folder }: PropType) {
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [folderName, setFolderName] = useState(folder.name);

    const handleOpenFolder = () => {
        setOpen(!open);
    };

    const handleSaveMode = async () => {
        if (folderName !== folder.name) {
            updateFolder({ id: folder.id!, name: folderName });
        }
        setEditMode(!editMode);
    };

    return (
        <div className="py-2">
            <div className="flex items-center justify-between group cursor-pointer gap-2">
                {!editMode ? (
                    <button
                        className="flex items-center gap-2 flex-grow"
                        onClick={handleOpenFolder}
                    >
                        <FolderIcon size={17} />
                        <span className="flex-1 line-clamp-1 capitalize dark:text-gray-300/90 text-start">
                            {folder?.name}
                        </span>
                    </button>
                ) : (
                    <input
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        name="folder"
                        className="w-11/12 pl-2 py-1 text-sm rounded"
                    />
                )}
                {!editMode ? (
                    <div className="flex opacity-0 group-hover:opacity-100 gap-1 transition-all duration-400 ease">
                        <FolderDropdown
                            handleEditMode={() => setEditMode(true)}
                            folderId={folder.id as string}
                        />
                        <ChevronDown
                            size={18}
                            className={cn(
                                'transition-rotate duration-300 ease',
                                open && 'rotate-180'
                            )}
                            onClick={handleOpenFolder}
                        />
                    </div>
                ) : (
                    <Save size={18} onClick={handleSaveMode} />
                )}
            </div>
            <FolderContent show={open} folderId={folder.id as string} />
        </div>
    );
}

export default Folder;
