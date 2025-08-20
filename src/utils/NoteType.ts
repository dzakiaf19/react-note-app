type Note = {
    id: string;
    title: string;
    body: string;
    createdAt: string;
    archived: boolean;
};

type NotePayload = {
    title: string;
    body: string;
    archived?: boolean;
};

export type { Note, NotePayload };