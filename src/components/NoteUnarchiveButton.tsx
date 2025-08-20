import React from "react";
import { useApp } from "../context/AppContext";

type UnarchiveButtonProps = {
    onUnarchive: () => void;
}

const NoteUnarchiveButton: React.FC<UnarchiveButtonProps> = ({ onUnarchive }) => {
    return (
        <button
            onClick={onUnarchive}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
            {useApp().t('notes.unarchive')}
        </button>
    );
};

export default NoteUnarchiveButton;