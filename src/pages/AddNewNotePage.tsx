import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/network-data";
import type { NotePayload } from "../utils/network-data";
import type { Note } from "../utils/NoteType";
import NoteAddForm from "../components/NoteAddForm";

type AddNewNotePageProps = {
    onNoteAdded?: (note: Note) => void;
};

const AddNewNotePage: React.FC<AddNewNotePageProps> = ({ onNoteAdded }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleAddNote = async (notePayload: NotePayload) => {
        setIsLoading(true);

        try {
            console.log('Adding new note:', notePayload);
            const { data, error, message } = await addNote(notePayload);

            if (error || !data) {
                alert(message || 'Failed to add note');
                return;
            }

            if (onNoteAdded) {
                onNoteAdded(data);
            }

            navigate('/');

        } catch (error) {
            console.error('Error adding note:', error);
            alert('Failed to add note. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Tambah Catatan Baru
                    </h1>
                    <button
                        onClick={handleGoBack}
                        className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                        disabled={isLoading}
                    >
                        Kembali
                    </button>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                    Buat catatan baru untuk menyimpan ide, pemikiran, atau informasi penting Anda.
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <NoteAddForm
                    onAddNote={handleAddNote}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default AddNewNotePage;