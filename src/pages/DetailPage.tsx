import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNote } from "../utils/network-data";
import NoteItem from "../components/NoteItem";
import type { Note } from "../utils/NoteType";
import BreadCrumb from "../components/BreadCrumb";

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
                    <div className="text-gray-600 dark:text-gray-300">Loading note...</div>
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
                            Go Back
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <BreadCrumb title={note.title} isArchived={note.archived} />
            <NoteItem
                note={note}
                onArchive={handleArchive}
                onDelete={handleDelete}
                onUnarchive={handleUnarchive}
                disableLink={true}
                showDelete={true}
            />
        </div>
    );
};

export default DetailPage;