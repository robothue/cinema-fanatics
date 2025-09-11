import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef(null);
  const location = useLocation();

  const fetchResults = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const [movieRes, tvRes] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/search/movie`, {
          params: {
            api_key: "13295311bfa4f8873b35a9b719a720eb",
            query: searchTerm,
          },
        }),
        axios.get(`https://api.themoviedb.org/3/search/tv`, {
          params: {
            api_key: "13295311bfa4f8873b35a9b719a720eb",
            query: searchTerm,
          },
        }),
      ]);

      // Normalize with year info
      const movies = movieRes.data.results.map((item) => ({
        id: item.id,
        type: "movie",
        displayTitle: item.title || item.original_title,
        poster: item.poster_path,
        year: item.release_date ? item.release_date.split("-")[0] : "—",
      }));

      const tvShows = tvRes.data.results.map((item) => ({
        id: item.id,
        type: "tv",
        displayTitle: item.name || item.original_name,
        poster: item.poster_path,
        year: item.first_air_date ? item.first_air_date.split("-")[0] : "—",
      }));

      let combined = [...movies, ...tvShows];
      const lowerSearch = searchTerm.toLowerCase();

      // Sort by relevance
      const ordered = combined
        .sort((a, b) => {
          const aTitle = a.displayTitle?.toLowerCase() || "";
          const bTitle = b.displayTitle?.toLowerCase() || "";

          if (aTitle === lowerSearch && bTitle !== lowerSearch) return -1;
          if (bTitle === lowerSearch && aTitle !== lowerSearch) return 1;

          if (aTitle.startsWith(lowerSearch) && !bTitle.startsWith(lowerSearch))
            return -1;
          if (bTitle.startsWith(lowerSearch) && !aTitle.startsWith(lowerSearch))
            return 1;

          if (aTitle.includes(lowerSearch) && !bTitle.includes(lowerSearch))
            return -1;
          if (bTitle.includes(lowerSearch) && !aTitle.includes(lowerSearch))
            return 1;

          return 0;
        })
        .slice(0, 8);

      setResults(ordered);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle typing with debounce
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      fetchResults(value);
    }, 300);
  };

  // Clear dropdown when navigating to new page
  useEffect(() => {
    setResults([]);
    setQuery("");
  }, [location.pathname]);

  // Clear debounce timer
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, []);

  return (
    <div className="relative w-80">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search movies or TV shows..."
        className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:ring-yellow-400"
      />

      {loading && (
        <p className="absolute mt-2 text-sm text-gray-500 bg-white p-2 rounded shadow w-full">
          Searching...
        </p>
      )}

      {results.length > 0 && (
        <ul className="absolute mt-2 bg-white rounded-lg shadow-lg w-full max-h-96 overflow-y-auto z-50">
          {results.map((item) => (
            <li key={`${item.type}-${item.id}`} className="hover:bg-gray-100">
              <Link
                to={`/${item.type}/${item.id}`}
                className="flex items-center p-2 space-x-3"
                onClick={() => {
                  setResults([]); // ✅ close dropdown
                  setQuery("");   // ✅ clear input
                }}
              >
                {item.poster ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${item.poster}`}
                    alt={item.displayTitle}
                    className="w-10 h-14 rounded"
                  />
                ) : (
                  <div className="w-10 h-14 bg-gray-300 flex items-center justify-center text-xs text-gray-500">
                    N/A
                  </div>
                )}
                <span>
                  {item.displayTitle}{" "}
                  <span className="text-gray-500 text-sm">({item.year})</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
