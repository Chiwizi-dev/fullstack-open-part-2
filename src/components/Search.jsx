const Search = ({ search, setSearch }) => {
  return (
    <div>
      <label htmlFor="search">filter shown with:</label>{" "}
      <input
        className="search"
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        id="search"
      />
    </div>
  );
};

export default Search;
