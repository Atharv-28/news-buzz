import React from 'react';

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      <input
        className='searchBar'
        placeholder='Search🔍...'
        type='search'
        value={searchTerm}//input of search Bar
        onChange={handleSearch}//calling function to filter the search results.. Function on ArticleFetch.js
      />
    </div>
  );
};

export default SearchBar;
