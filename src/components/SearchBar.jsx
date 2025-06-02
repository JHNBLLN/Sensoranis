import React from "react";
import "./css/SearchBar.css";
import { useState } from "react";

const SearchBar = ({ searchValue, setSearchValue, setCurrentPage }) => {
  const [inputValue, setInputValue] = useState(searchValue || "");

  const handleSearch = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    setSearchValue(inputValue);
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        className="header-search-bar"
        type="text"
        placeholder=" Search....."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
