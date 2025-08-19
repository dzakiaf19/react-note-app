import React from "react";
import NoteItem from "./NoteItem";
import type { Note } from "../utils/NoteType";

type NoteListProps = {
    notes: Note[];
    onArchive: (id: string) => void;
    onDelete: (id: string) => void;
    onUnarchive: (id: string) => void;
};

const NoteList: React.FC<NoteListProps> = ({ notes, onArchive, onDelete, onUnarchive }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
                <NoteItem
                    key={note.id}
                    note={note}
                    onArchive={onArchive}
                    onDelete={onDelete}
                    onUnarchive={onUnarchive}
                />
            ))}
        </div>
    );
};

export default NoteList;