import React from "react";
import type { NotePayload } from "../utils/network-data";

type NoteAddFormProps = {
    onAddNote: (note: NotePayload) => void;
    isLoading?: boolean;
};

const NoteAddForm: React.FC<NoteAddFormProps> = ({ onAddNote, isLoading = false }) => {
    const [title, setTitle] = React.useState('');
    const [body, setBody] = React.useState('');

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

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Judul Catatan"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    disabled={isLoading}
                    required
                />
            </div>

            <div>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Tulis catatan Anda di sini..."
                    className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    disabled={isLoading}
                    required
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isLoading || !title.trim() || !body.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Menyimpan...
                        </>
                    ) : (
                        'Tambah Catatan'
                    )}
                </button>
            </div>
        </form>
    );
};

export default NoteAddForm;