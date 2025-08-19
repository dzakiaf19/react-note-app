import React from "react";
import type { User } from "../utils/network-data";

type NoteHeaderProps = {
    onLogout: () => void;
    user: User | null;
};

const NoteHeader: React.FC<NoteHeaderProps> = ({ onLogout, user }) => {
    return (
        <header className="text-white p-4 shadow-md flex items-center justify-between bg-gray-800">
            <h1 className="text-2xl font-bold">Note App</h1>
            <span className="text-sm">Welcome, {user !== null ? user.name : '...'}</span>
            <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            >
                Logout
            </button>
        </header>
    );
};

export default NoteHeader;