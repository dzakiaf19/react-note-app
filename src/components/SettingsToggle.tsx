import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
    FaCog,
    FaMoon,
    FaSun,
    FaCheck
} from 'react-icons/fa';

const SettingsToggle: React.FC = () => {
    const { theme, language, setTheme, setLanguage } = useApp();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLanguageChange = (lang: 'id' | 'en') => {
        setLanguage(lang);
        setIsDropdownOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label="Settings"
            >
                <FaCog className="w-5 h-5" />
            </button>

            {isDropdownOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsDropdownOpen(false)}
                    ></div>

                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20">
                        <div className="p-4 space-y-4">
                            {/* Theme Toggle */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Theme
                                </span>
                                <button
                                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                                    className="flex items-center space-x-2 p-2 rounded-md bg-gray-400 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >
                                    {theme === 'light' ? (
                                        <>
                                            <FaMoon className="w-4 h-4" />
                                            <span className="text-sm">Dark</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaSun className="w-4 h-4" />
                                            <span className="text-sm">Light</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Language Selection */}
                            <div className="space-y-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Language
                                </span>
                                <div className="space-y-1">
                                    <button
                                        onClick={() => handleLanguageChange('id')}
                                        className={`w-full flex items-center space-x-2 p-2 rounded-md text-sm transition-colors ${language === 'id'
                                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        <span className="text-lg">🇮🇩</span>
                                        <span>Bahasa Indonesia</span>
                                        {language === 'id' && (
                                            <FaCheck className="w-4 h-4 ml-auto" />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => handleLanguageChange('en')}
                                        className={`w-full flex items-center space-x-2 p-2 rounded-md text-sm transition-colors ${language === 'en'
                                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        <span className="text-lg">🇺🇸</span>
                                        <span>English</span>
                                        {language === 'en' && (
                                            <FaCheck className="w-4 h-4 ml-auto" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SettingsToggle;