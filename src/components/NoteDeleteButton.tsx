import React from "react";

type NoteDelteButtonProps = {
    onDelete: () => void;
}

const NoteDeleteButton: React.FC<NoteDelteButtonProps> = ({ onDelete }) => {
    return (
        <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
            Delete Note
        </button>
    );
};

export default NoteDeleteButton;