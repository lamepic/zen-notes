'use client';

import React from 'react';
import { note } from '@/types/database-schema';
import { updateNote } from '@/services/note';

const NoteContext = React.createContext<any>(null);

export function NoteProvider({ children }: { children: React.ReactNode }) {
    const [selectedNote, setSelectedNote] = React.useState<note | null>(null);

    const updateSelectedNote = async (update: {
        name: string;
        content: string;
    }) => {
        if (selectedNote) {
            await updateNote({
                id: selectedNote?.id!,
                ...update,
            });
        }
    };

    return (
        <NoteContext.Provider
            value={{ selectedNote, setSelectedNote, updateSelectedNote }}
        >
            {children}
        </NoteContext.Provider>
    );
}

export const useNote = () => React.useContext(NoteContext);
