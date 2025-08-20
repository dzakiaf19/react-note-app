import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNote } from "../utils/network-data";
import type { Note } from "../utils/NoteType";
import BreadCrumb from "../components/BreadCrumb";
import { useApp } from "../context/AppContext";

type DetailPageProps = {
    onArchive: (id: string) => void;
    onDelete: (id: string) => void;
    onUnarchive: (id: string) => void;
};

const DetailPage: React.FC<DetailPageProps> = ({ onArchive, onDelete, onUnarchive }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [note, setNote] = useState<Note | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { t } = useApp();

    useEffect(() => {
        const fetchNote = async () => {
            if (!id) {
                setError('Invalid note ID');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                console.log('Fetching note with ID:', id);
                const { data, error: apiError, message } = await getNote(id);

                if (apiError || !data) {
                    setError(message || 'Failed to load note');
                    setNote(null);
                } else {
                    console.log('Note fetched successfully:', data);
                    setNote(data);
                }
            } catch (err) {
                console.error('Error fetching note:', err);
                setError('Failed to load note');
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [id]);

    const handleNavigateBack = () => {
        navigate(-1);
    };

    const handleArchive = () => {
        if (note) {
            onArchive(note.id);
            handleNavigateBack();
        }
    };

    const handleDelete = () => {
        if (note) {
            onDelete(note.id);
            handleNavigateBack();
        }
    };

    const handleUnarchive = () => {
        if (note) {
            onUnarchive(note.id);
            handleNavigateBack();
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <div className="text-gray-600 dark:text-gray-300">{t('message.loading')}</div>
                </div>
            </div>
        );
    }

    if (error || !note) {
        return (
            <div className="container mx-auto p-4">
                <div className="text-center">
                    <div className="text-red-500 mb-4">
                        {error || 'Note not found'}
                    </div>
                    <div className="space-x-2">
                        <button
                            onClick={handleNavigateBack}
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                            {t('button.goBack')}
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {t('button.backToHome')}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <BreadCrumb title={note.title} isArchived={note.archived} />
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{note.title}</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{note.body}</p>
                <div className="flex justify-between space-x-2">
                    <div className="flex space-x-2">
                        <button
                            onClick={handleNavigateBack}
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                            {t('button.goBack')}
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {t('button.backToHome')}
                        </button>
                    </div>
                    <div className="flex space-x-2">
                        {note.archived === true ? (
                            <button
                                onClick={handleUnarchive}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                {t('notes.unarchive')}
                            </button>
                        ) : (
                            <button
                                onClick={handleArchive}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                {t('notes.archive')}
                            </button>
                        )}
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            {t('notes.delete')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;