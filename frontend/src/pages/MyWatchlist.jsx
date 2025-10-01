import { useEffect, useState } from "react";
import axios from "axios";
import WatchlistFilters from "../components/Watchlist/WatchlistFilters";
import WatchlistGrid from "../components/Watchlist/WatchlistGrid";

export default function MyWatchlist() {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({
    status: "all",
    genre: "",
    minRating: "",
    releaseYear: "",
    searchTerm: ""
  });

  // dummy user until auth is ready
  const userId = "123";

  // ✅ Fetch watchlist from backend
  useEffect(() => {
    axios.get(`http://localhost:5000/api/watchlist/${userId}`)
      .then(res => setMovies(res.data))
      .catch(err => console.error("❌ Error fetching watchlist:", err));
  }, []);

  // ✅ Remove movie by tmdbId
  const handleRemove = async (tmdbId) => {
    try {
      await axios.delete(`http://localhost:5000/api/watchlist/${userId}/${tmdbId}`);
      setMovies(prev => prev.filter(m => m.tmdbId !== tmdbId));
    } catch (err) {
      console.error("❌ Error removing movie:", err);
    }
  };

  // Filtering logic
  const filteredMovies = movies.filter(movie => {
    if (filters.status === "watched" && !movie.watched) return false;
    if (filters.status === "not-watched" && movie.watched) return false;
    if (filters.genre && !movie.genre.includes(filters.genre)) return false;
    if (filters.minRating && movie.rating < parseFloat(filters.minRating)) return false;
    if (filters.releaseYear && String(movie.year) !== filters.releaseYear) return false;
    if (filters.searchTerm && !movie.title.toLowerCase().includes(filters.searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">My Watchlist</h1>
      <WatchlistFilters movies={movies} filters={filters} setFilters={setFilters} />
      <WatchlistGrid movies={filteredMovies} onRemove={handleRemove} />
    </div>
  );
}
