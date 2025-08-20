import React from "react";
import { useApp } from "../context/AppContext";

interface LoginInputProps {
    email: string;
    password: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: React.FormEvent) => void;
    isLoading?: boolean;
    error?: string | null;
}

const LoginInput: React.FC<LoginInputProps> = ({
    email,
    password,
    onChange,
    onSubmit,
    isLoading = false,
    error
}) => {
    const { t } = useApp();

    return (
        <form
            onSubmit={onSubmit}
            className=" dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm space-y-4"
        >
            <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
                {t('auth.login')}
            </h2>

            {/* Error message display */}
            {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-md">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                        {t('auth.email')}
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder={t('auth.emailPlaceholder')}
                        required
                        disabled={isLoading}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md 
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 transition-colors duration-200"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                        {t('auth.password')}
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder={t('auth.passwordPlaceholder')}
                        required
                        disabled={isLoading}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md 
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 transition-colors duration-200"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading || !email.trim() || !password.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 
                         text-white p-3 rounded-md font-medium
                         transition-colors duration-200
                         disabled:cursor-not-allowed
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         dark:focus:ring-offset-gray-800"
            >
                {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                        <svg
                            className="animate-spin h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        <span>{t('auth.loginLoading')}</span>
                    </div>
                ) : (
                    t('auth.login')
                )}
            </button>
        </form>
    );
};

export default LoginInput;