import { folder, note } from '@/types/database-schema';
import Dexie, { Table } from 'dexie';

export class MySubClassedDexie extends Dexie {
    folders!: Table<folder>;
    notes!: Table<note>;

    constructor() {
        super('zen-notes-db');
        this.version(1).stores({
            folders: '++id, name',
            notes: '++id, name, folderId, content',
        });
    }
}

export const db = new MySubClassedDexie();
