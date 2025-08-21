import React from "react";
import type { Note } from "../utils/NoteType";
import NoteList from "../components/NoteList";
import Breadcrumb from "../components/BreadCrumb";
import SearchBar from "../components/SearchBar";
import { useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext";

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
    const { t } = useApp();

    const archivedNotes = notes
        .filter(note =>
            note.title.toLowerCase().includes(keyword.toLowerCase()) ||
            note.body.toLowerCase().includes(keyword.toLowerCase())
        );

    return (
        <div className="container mx-auto p-4">
            <Breadcrumb />
            <SearchBar />
            <h1 className="text-2xl font-bold mb-4">{t('notes.archivedNotes')}</h1>
            {archivedNotes.length > 0 ? (
                <NoteList
                    notes={archivedNotes}
                    onArchive={() => { }}
                    onUnarchive={onUnarchiveNote}
                    onDelete={onDeleteNote}
                />
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
                    {t('notes.noArchivedNotes')}
                </p>
            )}
        </div>
    );
};

export default ArchivedPage;