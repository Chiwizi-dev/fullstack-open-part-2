const Search = ({ search, setSearch }) => {
  return (
    <div>
      <span>filter shown with:</span>{" "}
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
    </div>
  );
};

export default Search;
