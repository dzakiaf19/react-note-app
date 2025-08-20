import React from "react";
import NoteTitle from "./NoteTitle";
import NoteArchiveButton from "./NoteArchiveButton";
import NoteDeleteButton from "./NoteDeleteButton";
import NoteUnarchiveButton from "./NoteUnarchiveButton";
import type { Note } from "../utils/NoteType";
import { Link } from "react-router-dom";

type NoteItemProps = {
    note: Note;
    onArchive: (id: string) => void;
    onDelete: (id: string) => void;
    onUnarchive: (id: string) => void;
    disableLink?: boolean;
    showDelete?: boolean;
};

const NoteItem: React.FC<NoteItemProps> = ({ note, onArchive, onDelete, onUnarchive, disableLink = false, showDelete = false }) => {
    const handleDelete = () => onDelete(note.id);
    const handleArchive = () => onArchive?.(note.id);
    const handleUnarchive = () => onUnarchive?.(note.id);

    return (
        <div className="flex flex-col justify-between p-4 bg-white rounded shadow-md dark:bg-gray-800 min-h-[280px]">
            <div className="flex items-center justify-between">
                {disableLink ? (
                    <NoteTitle title={note.title} />
                ) : (
                    <Link
                        to={`/notes/${note.id}`}
                        className="text-lg font-semibold text-gray-900 dark:text-gray-100"
                    >
                        <NoteTitle title={note.title} />
                    </Link>
                )}
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-4">
                    {new Date(note.createdAt).toLocaleDateString()}
                </span>
            </div>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{note.body}</p>
            <div className="mt-4 flex justify-end space-x-2">
                {note.archived ? (
                    <NoteUnarchiveButton onUnarchive={handleUnarchive} />
                ) : (
                    <NoteArchiveButton onArchive={handleArchive} />
                )}
                {showDelete && (
                    <NoteDeleteButton onDelete={handleDelete} />
                )}
            </div>
        </div>
    );
};

export default NoteItem;
