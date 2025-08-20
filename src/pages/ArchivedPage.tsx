import React from "react";
import type { Note } from "../utils/NoteType";
import NoteList from "../components/NoteList";
import Breadcrumb from "../components/BreadCrumb";
import SearchBar from "../components/SearchBar";
import { useSearchParams } from "react-router-dom";

type ArchivedPageProps = {
    notes: Note[];
    onUnarchiveNote: (id: string) => void;
    onDeleteNote: (id: string) => void;
};

const ArchivedPage: React.FC<ArchivedPageProps> = ({
    notes,
    onUnarchiveNote,
    onDeleteNote
}) => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';

    const archivedNotes = notes
        .filter(note =>
            note.title.toLowerCase().includes(keyword.toLowerCase()) ||
            note.body.toLowerCase().includes(keyword.toLowerCase())
        );

    return (
        <div className="container mx-auto p-4">
            <Breadcrumb />
            <SearchBar />
            <h1 className="text-2xl font-bold mb-4">Catatan Terarsip</h1>
            {notes.length > 0 ? (
                <NoteList
                    notes={archivedNotes}
                    onArchive={() => { }}
                    onUnarchive={onUnarchiveNote}
                    onDelete={onDeleteNote}
                />
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
                    Tidak ada catatan terarsip.
                </p>
            )}
        </div>
    );
};

export default ArchivedPage;