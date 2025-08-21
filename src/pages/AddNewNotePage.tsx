import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/network-data";
import type { NotePayload } from "../utils/network-data";
import type { Note } from "../utils/NoteType";
import NoteAddForm from "../components/NoteAddForm";
import Breadcrumb from "../components/BreadCrumb";
import { useApp } from "../context/AppContext";

type AddNewNotePageProps = {
    onNoteAdded?: (note: Note) => void;
};

const AddNewNotePage: React.FC<AddNewNotePageProps> = ({ onNoteAdded }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useApp();

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

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <Breadcrumb />
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {t('notes.addNote')}
                    </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                    {t('notes.addNoteDescription')}
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