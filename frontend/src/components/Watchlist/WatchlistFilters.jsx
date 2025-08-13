export default function WatchlistFilters({ movies, filters, setFilters }) {
    const genres = [...new Set(movies.flatMap(m => m.genre))];
    const years = [...new Set(movies.map(m => m.year))].sort((a, b) => b - a);
  
    const buttonClasses = (active) =>
      `px-4 py-2 rounded-md border transition-colors duration-200 ${
        active ? "bg-gray-900 text-white border-gray-900" : "bg-white border-gray-300 hover:bg-gray-100"
      }`;
  
    const selectClasses =
      "px-4 py-2 rounded-md border border-gray-300 bg-white hover:border-gray-400 transition-colors duration-200";
  
    const inputClasses =
      "px-4 py-2 rounded-md border border-gray-300 bg-white hover:border-gray-400 transition-colors duration-200 flex-1 min-w-[200px]";
  
    return (
      <div className="flex flex-wrap gap-3 mb-8">
        {["all", "watched", "not-watched"].map(status => (
          <button
            key={status}
            onClick={() => setFilters(prev => ({ ...prev, status }))}
            className={buttonClasses(filters.status === status)}
          >
            {status === "all" ? "All Movies" : status === "watched" ? "Watched" : "Not Watched"}
          </button>
        ))}
  
        <select
          value={filters.genre}
          onChange={e => setFilters(prev => ({ ...prev, genre: e.target.value }))}
          className={selectClasses}
        >
          <option value="">Genre</option>
          {genres.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
  
        <select
          value={filters.minRating}
          onChange={e => setFilters(prev => ({ ...prev, minRating: e.target.value }))}
          className={selectClasses}
        >
          <option value="">Min. Rating</option>
          {[...Array(10)].map((_, i) => (
            <option key={i+1} value={i+1}>{i+1}</option>
          ))}
        </select>
  
        <select
          value={filters.releaseYear}
          onChange={e => setFilters(prev => ({ ...prev, releaseYear: e.target.value }))}
          className={selectClasses}
        >
          <option value="">Release Year</option>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
  
        <input
          type="text"
          placeholder="Search watchlist..."
          value={filters.searchTerm}
          onChange={e => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
          className={inputClasses}
        />
      </div>
    );
  }
  