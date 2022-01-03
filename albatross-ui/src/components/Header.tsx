import React from "react";

const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-center px-4 py-2 bg-gray-800 text-white">
        <h1 className="text-2xl font-bold">
            <span className="text-teal-500">Albatross</span>
        </h1>
        </header>
    );
}

export default Header;