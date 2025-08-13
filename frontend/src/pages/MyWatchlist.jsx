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

  useEffect(() => {
    axios.get("/api/watchlist")
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`/api/watchlist/${id}`);
      setMovies(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error(err);
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
