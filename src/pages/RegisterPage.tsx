import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../utils/network-data";
import RegisterInput from "../components/RegisterInput";
import { useApp } from "../context/AppContext";

const RegisterPage: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { t } = useApp();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (error) setError(null);

        if (name === "name") setName(value);
        else if (name === "email") setEmail(value);
        else if (name === "password") setPassword(value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!name.trim() || !email.trim() || !password.trim()) {
            setError("All fields are required");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const { error: registerError, data } = await register({ name, email, password });

            if (!registerError && data) {
                navigate("/login");
            } else {
                setError("Registration failed. Please try again.");
                console.error("Registration error:", registerError);
            }
        } catch (err) {
            console.error("Registration error:", err);
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

                <RegisterInput
                    name={name}
                    email={email}
                    password={password}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />

                <p className="text-sm text-center">
                    {t('auth.alreadyHaveAccount')}{" "}
                    <Link
                        to="/"
                        className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
                    >
                        {t('auth.login')}
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;