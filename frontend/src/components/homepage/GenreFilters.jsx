import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function GenreFilters() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState(["All"]);
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => {
        const allMovies = res.data;
        setMovies(allMovies);

        // Fix: handle comma-separated genre strings
        const genreSet = new Set();

        allMovies.forEach((movie) => {
          movie.genres?.forEach((genreGroup) => {
            genreGroup
              .split(",")
              .map((g) => g.trim())
              .forEach((g) => genreSet.add(g));
          });
        });

        // Limit to top 10 genres + All
        const genreList = Array.from(genreSet).slice(0, 10);
        setGenres(["All", ...genreList]);
      })
      .catch((err) => console.error("GenreFilters error:", err));
  }, []);

  const filteredMovies =
    selectedGenre === "All"
      ? movies
      : movies.filter((movie) =>
          movie.genres?.some((group) =>
            group
              .split(",")
              .map((g) => g.trim().toLowerCase())
              .includes(selectedGenre.toLowerCase())
          )
        );

  return (
    <section className="bg-white text-black py-14 px-6 md:px-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">
        Browse by Genre
      </h2>

      {/* Genre Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm ${
              selectedGenre === genre
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Movie Grid with animation */}
      <motion.div
        key={selectedGenre}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6"
      >
        <AnimatePresence mode="wait">
          {filteredMovies.slice(0, 12).map((movie) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition overflow-hidden"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="p-2">
                <h3 className="text-xs md:text-sm font-semibold truncate">
                  {movie.title}
                </h3>
                <div className="flex justify-between text-[11px] md:text-xs text-gray-500 mt-1">
                  <span>⭐ {movie.vote_average.toFixed(1)}</span>
                  <span>{movie.release_date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
