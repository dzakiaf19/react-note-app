import React from "react";

const NoteTitle: React.FC<{ title: string }> = ({ title }) => {
    return (
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {title}
        </h2>
    );
}

export default NoteTitle;