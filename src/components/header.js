import React from "react";
import "../styles/header.css";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SearchBar from "./searchBar";

const Header = ({ searchTerm, handleSearch }) => {
  return (
    <header className="header">
      <h1 className="head">News Buzz 📰</h1>
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} /> {/* Include SearchBar */}
    </header>
  );
};

export default Header;