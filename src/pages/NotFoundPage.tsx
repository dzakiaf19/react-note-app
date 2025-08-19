import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4 text-center">
            <h1 className="text-4xl font-bold mb-4">404 - Halaman Tidak Ditemukan</h1>
            <p className="text-gray-500 mb-6">Maaf, halaman yang Anda cari tidak ditemukan.</p>
            <Link
                to="/"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
                Kembali ke Beranda
            </Link>
        </div>
    );
};

export default NotFoundPage;