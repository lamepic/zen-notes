import { db } from '@/lib/database';

export const createFolder = async (name: string) => {
    await db.folders.add({
        name,
    });
};

export const getFolders = async () => {
    return db.folders.toArray();
};

export const deleteFolder = async (id: string) => {
    await db.folders.delete(id);
};

export const updateFolder = async ({
    id,
    name,
}: {
    id: string;
    name: string;
}) => {
    await db.folders.update(id, { name });
};
