export type folder = {
    id?: string;
    name: string;
};

export type note = {
    id?: string;
    name: string;
    folderId: string;
    content: string;
};
