import React from "react";
import { useApp } from "../context/AppContext";

type NoteArchiveButtonProps = {
    onArchive: () => void;
}

const NoteArchiveButton: React.FC<NoteArchiveButtonProps> = ({ onArchive }) => {
    return (
        <button
            onClick={onArchive}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
            {useApp().t('notes.archive')}
        </button>
    );
}

export default NoteArchiveButton;