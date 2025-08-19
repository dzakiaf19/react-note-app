import React from "react";
import { useSearchParams } from "react-router-dom";

const SearchBar: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchKeyword = searchParams.get('keyword') || '';
    const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newKeyword = event.target.value;
        setSearchParams({ keyword: newKeyword });
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                value={searchKeyword}
                onChange={handleKeywordChange}
                placeholder="Cari catatan..."
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default SearchBar;