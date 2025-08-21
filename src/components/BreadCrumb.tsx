import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

type BreadcrumbProps = {
    title?: string;
    isArchived?: boolean;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ title, isArchived = false }) => {
    const location = useLocation();
    const pathParts = location.pathname.split("/").filter(Boolean);

    const isNewPage = pathParts.includes("new");
    const isArchivePage = pathParts.includes("archived");
    const isDetailPage = pathParts.includes("notes") && pathParts.length === 2;

    const { t } = useApp();

    return (
        <nav className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            <ul className="flex flex-wrap items-center space-x-2">
                <li>
                    <Link to="/" className="hover:underline text-blue-600 dark:text-blue-400">
                        {t('breadcrumb.notes')}
                    </Link>
                </li>

                {isArchived && (
                    <>
                        <li>/</li>
                        <li>
                            <Link to="/archived" className="hover:underline text-blue-600 dark:text-blue-400">
                                {t('breadcrumb.archived')}
                            </Link>
                        </li>
                    </>
                )}

                {isNewPage && (
                    <>
                        <li>/</li>
                        <li>
                            <Link to="/notes/new" className="hover:underline text-blue-600 dark:text-blue-400">
                                {t('breadcrumb.addNote')}
                            </Link>
                        </li>
                    </>
                )}

                {isArchivePage && (
                    <>
                        <li>/</li>
                        <li>
                            <Link to="/archived" className="hover:underline text-blue-600 dark:text-blue-400">
                                Archived
                            </Link>
                        </li>
                    </>
                )}

                {isDetailPage && title && (
                    <>
                        <li>/</li>
                        <li className="truncate max-w-[200px] text-gray-800 dark:text-gray-200">{title}</li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Breadcrumb;
