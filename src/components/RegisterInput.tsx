import React from "react";

interface RegisterInputProps {
    name: string;
    email: string;
    password: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: React.FormEvent) => void;
    isLoading?: boolean;
    error?: string | null;
}

const RegisterInput: React.FC<RegisterInputProps> = ({
    name,
    email,
    password,
    onChange,
    onSubmit,
    isLoading = false,
    error
}) => {
    return (
        <form
            onSubmit={onSubmit}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm space-y-4"
        >
            <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
                Register
            </h2>

            {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-md">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        placeholder="Enter your name"
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
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="Enter your email"
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
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="Enter your password"
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
                disabled={isLoading || !name.trim() || !email.trim() || !password.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 
                         text-white p-3 rounded-md font-medium
                         transition-colors duration-200
                         disabled:cursor-not-allowed
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         dark:focus:ring-offset-gray-800"
            >
                {isLoading ? "Registering..." : "Register"}
            </button>
        </form>
    );
}

export default RegisterInput;