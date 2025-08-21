import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

const NotFoundPage: React.FC = () => {
    const { t } = useApp();
    return (
        <div className="container mx-auto p-4 text-center">
            <h1 className="text-4xl font-bold mb-4">{t('error.pageNotFound')}</h1>
            <p className="text-gray-500 mb-6">{t('error.bodyPageNotFound')}</p>
            <Link
                to="/"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
                {t('button.backToHome')}
            </Link>
        </div>
    );
};

export default NotFoundPage;