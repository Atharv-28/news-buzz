import React from 'react';

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      <input
        className='searchBar'
        placeholder='Search🔍...'
        type='search'
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
