import React from "react";
import type { NotePayload } from "../utils/network-data";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

type NoteAddFormProps = {
    onAddNote: (note: NotePayload) => void;
    isLoading?: boolean;
};

const NoteAddForm: React.FC<NoteAddFormProps> = ({ onAddNote, isLoading = false }) => {
    const [title, setTitle] = React.useState('');
    const [body, setBody] = React.useState('');
    const { t } = useApp();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() && body.trim()) {
            const newNote: NotePayload = {
                title,
                body,
            };
            onAddNote(newNote);
            setTitle('');
            setBody('');
        }
    }

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={t('notes.noteTitle')}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    disabled={isLoading}
                    required
                />
            </div>

            <div>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder={t('notes.noteBody')}
                    className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    disabled={isLoading}
                    required
                />
            </div>

            <div className="flex justify-between items-center space-x-4">
                <button
                    onClick={handleGoBack}
                    className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                    disabled={isLoading}
                >
                    {t('button.goBack')}
                </button>
                <button
                    type="submit"
                    disabled={isLoading || !title.trim() || !body.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            {t('button.loading')}
                        </>
                    ) : (
                        t('notes.addNote')
                    )}
                </button>
            </div>
        </form>
    );
};

export default NoteAddForm;