import React from "react";
import { useApp } from "../context/AppContext";
import SettingsToggle from "./SettingsToggle";
import type { User } from "../utils/network-data";

type NoteHeaderProps = {
    onLogout: () => void;
    user: User | null;
    isAuthenticated?: boolean;
};

const NoteHeader: React.FC<NoteHeaderProps> = ({ onLogout, user, isAuthenticated = true }) => {
    const { t } = useApp();

    return (
        <header className="text-white p-4 shadow-md flex items-center justify-between bg-gray-800 dark:bg-gray-900">
            <h1 className="text-2xl font-bold text-white dark:text-gray-100">
                {t('notes.title')}
            </h1>

            <div className="flex items-center space-x-4">
                {isAuthenticated && user ? (
                    <>
                        <span className="text-sm text-gray-200 dark:text-gray-300">
                            {t('nav.profile')}: {user.name}
                        </span>
                        <button
                            onClick={onLogout}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded transition-colors duration-200"
                        >
                            {t('nav.logout')}
                        </button>
                    </>
                ) : (
                    <>
                        <span className="text-sm text-gray-300 dark:text-gray-400">
                            {t('auth.welcome')}
                        </span>
                    </>
                )}
                <SettingsToggle />
            </div>
        </header>
    );
};

export default NoteHeader;