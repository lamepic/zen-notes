import { deleteFolder } from '@/services/folder';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { EllipsisVertical, PencilIcon, Trash } from 'lucide-react';

type PropType = {
    handleEditMode: () => void;
    folderId: string;
};

function FolderDropdown({ handleEditMode, folderId }: PropType) {
    const handleDelete = async () => {
        deleteFolder(folderId);
    };
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <EllipsisVertical size={18} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-32">
                    <DropdownMenuItem
                        className="flex items-center gap-3"
                        onClick={handleEditMode}
                    >
                        <PencilIcon size={15} />
                        <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="flex items-center gap-3"
                        onClick={handleDelete}
                    >
                        <Trash size={15} />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default FolderDropdown;
