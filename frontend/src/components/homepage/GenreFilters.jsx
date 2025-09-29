import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function GenreFilters() {
  const [movies, setMovies] = useState([]);
  const [genres] = useState([
    { id: "all", name: "All" },
    { id: 28, name: "Action" },
    { id: 18, name: "Drama" },
    { id: 35, name: "Comedy" },
    { id: 27, name: "Horror" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Sci-Fi" },
  ]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMovies("all");
  }, []);

  const fetchMovies = async (genreId) => {
    setLoading(true);
    const url =
      genreId !== "all"
        ? `http://localhost:5000/api/tmdb/discover?with_genres=${genreId}`
        : "http://localhost:5000/api/tmdb/movies";

    try {
      const res = await axios.get(url);
      setMovies(res.data.results || []);
    } catch (err) {
      console.error("❌ Movies fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    fetchMovies(genreId);
  };

  return (
    <section className="bg-white text-black py-14 px-6 md:px-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">
        Browse by Genre
      </h2>

      {/* Genre Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreChange(genre.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm ${
              selectedGenre === genre.id
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Loader */}
      {loading && <p className="text-gray-500">Loading...</p>}

      {/* Animated Movie Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedGenre}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6"
        >
          {movies.slice(0, 12).map((movie) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition overflow-hidden"
            >
              <Link to={`/movie/${movie.id}`} className="block">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-2">
                  <h3 className="text-xs md:text-sm font-semibold truncate">
                    {movie.title || movie.name}
                  </h3>
                  <div className="flex justify-between text-[11px] md:text-xs text-gray-500 mt-1">
                    <span>⭐ {movie.vote_average?.toFixed(1) || "N/A"}</span>
                    <span>
                      {(movie.release_date || movie.first_air_date || "").split(
                        "-"
                      )[0]}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

