
const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      <input
        className='searchBar'
        placeholder='&#x1F50D;Search...'
        type='search'
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
