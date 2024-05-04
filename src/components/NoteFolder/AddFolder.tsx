import { createFolder } from '@/services/folder';

function AddFolder() {
    const addFolder = () => {
        createFolder('New Folder');
    };

    return (
        <button className="p-2 mt-auto border-t w-full" onClick={addFolder}>
            Add folder...
        </button>
    );
}

export default AddFolder;
