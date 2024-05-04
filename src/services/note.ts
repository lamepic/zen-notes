import { db } from '@/lib/database';

export const createNote = async ({
    name,
    folderId,
    content,
}: {
    name: string;
    folderId: string;
    content: string;
}) => {
    return await db.notes.add({
        name,
        folderId,
        content,
    });
};

export const getNotes = async (id: string) => {
    return await db.notes.where('folderId').equals(id).toArray();
};

export const getNote = async (id: string) => {
    return await db.notes.where('id').equals(id).first();
};

export const deleteNote = async (id: string) => {
    await db.notes.delete(id);
};

export const updateNote = async ({
    id,
    name,
    content,
}: {
    id: string;
    name: string;
    content: string;
}) => {
    await db.notes.update(id, { name, content });
};
