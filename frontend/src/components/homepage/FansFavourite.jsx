import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function FansFavourite() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const MOVIES_PER_PAGE = 6;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tmdb/movies?sort_by=vote_count.desc")
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.error("FansFavourite error:", err));
  }, []);
  
  // ✅ Loop without leaving empty slots
  const totalPages = Math.floor(movies.length / MOVIES_PER_PAGE);
  const start = page * MOVIES_PER_PAGE;
  const currentMovies = movies.slice(start, start + MOVIES_PER_PAGE);

  const handleNext = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  return (
    <section className="bg-white text-black py-14 px-6 md:px-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">
        Fans’ Favourite
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4 md:gap-6">
        <AnimatePresence mode="wait">
          {currentMovies.map((movie) => {
            const title = movie.title || movie.name;
            const year = (movie.release_date || movie.first_air_date || "").split("-")[0];
            const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
            const mediaType = movie.media_type || "movie";

            return (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
                }}
                className="rounded-lg overflow-hidden"
              >
                <Link
                  to={`/${mediaType}/${movie.id}`}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden block"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={title}
                    className="w-full h-48 object-cover transition-transform duration-300"
                  />
                  <div className="p-2">
                    <h3 className="text-xs md:text-sm font-semibold truncate">
                      {title}
                    </h3>
                    <div className="flex justify-between text-[11px] md:text-xs text-gray-500 mt-1">
                      <span>⭐ {rating}</span>
                      <span>{year}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* See More Button */}
        {totalPages > 1 && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center justify-center rounded-lg"
          >
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg shadow-md hover:shadow-xl transition"
            >
              See More →
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
