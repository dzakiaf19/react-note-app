import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login, putAccessToken } from "../utils/network-data";
import { useNavigate } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { useApp } from "../context/AppContext";

interface LoginPageProps {
    onLogin: (accessToken: string) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { t } = useApp();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (error) setError(null);

        if (name === "email") setEmail(value);
        else if (name === "password") setPassword(value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!email.trim() || !password.trim()) {
            setError("Email and password are required");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const { error: loginError, data } = await login({ email, password });

            if (!loginError && data?.accessToken) {
                putAccessToken(data.accessToken);
                onLogin(data.accessToken);
                navigate("/");
            } else {
                setError(t('auth.loginFailed') || 'Login failed. Please try again.');
                console.error("Login failed:", loginError);
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center flex-col">
            <div className="w-full max-w-md space-y-6 flex flex-col items-center">
                {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                        {error}
                    </div>
                )}

                <LoginInput
                    email={email}
                    password={password}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />

                <p className="text-sm text-center">
                    {t('auth.noAccount')}
                    {' '}
                    <Link
                        to="/register"
                        className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
                    >
                        {t('auth.registerHere')}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;