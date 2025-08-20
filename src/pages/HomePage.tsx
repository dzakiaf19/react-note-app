import React from "react";
import type { Note } from "../utils/NoteType";
import NoteList from "../components/NoteList";
import { Link, useSearchParams } from "react-router-dom";
import { FaPlus, FaArchive } from "react-icons/fa";
import SearchBar from "../components/SearchBar";
import { useApp } from "../context/AppContext";

type HomePageProps = {
    notes: Note[];
    onSearchChange: (query: string) => void;
    onArchiveNote: (id: string) => void;
    onUnarchiveNote: (id: string) => void;
    onDeleteNote: (id: string) => void;
};

const HomePage: React.FC<HomePageProps> = ({
    notes,
    onArchiveNote,
    onUnarchiveNote,
    onDeleteNote,
}) => {
    const { t } = useApp();

    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';

    const unarchivedNotes = notes.filter(note => !note.archived).filter(note =>
        note.title.toLowerCase().includes(keyword.toLowerCase()) ||
        note.body.toLowerCase().includes(keyword.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-end mb-4 space-x-2">
                <Link
                    to="/notes/new"
                    className="flex items-center space-x-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                >
                    <FaPlus />
                    <span className="hidden sm:inline">{t('notes.addNote')}</span>
                </Link>
                <Link
                    to="/archived"
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
                >
                    <FaArchive />
                    <span className="hidden sm:inline">{t('notes.archive')}</span>
                </Link>
            </div>
            <SearchBar />
            {unarchivedNotes.length > 0 ? (
                <NoteList
                    notes={unarchivedNotes}
                    onArchive={onArchiveNote}
                    onDelete={onDeleteNote}
                    onUnarchive={onUnarchiveNote}
                />
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
                    {t('notes.noNotesFound')}
                </p>
            )}
        </div>
    );
};

export default HomePage;