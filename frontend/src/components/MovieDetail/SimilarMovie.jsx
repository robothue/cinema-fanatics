// src/components/MovieDetail/SimilarMovies.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function SimilarMovies({ movies }) {
  const [page, setPage] = useState(0);
  const pageSize = 6;

  const startIndex = page * pageSize;
  const currentMovies = movies.slice(startIndex, startIndex + pageSize);
  const hasNextPage = startIndex + pageSize < movies.length;

  const handleShowMore = () => {
    setPage((prev) => (hasNextPage ? prev + 1 : 0));
  };

  return (
    <section className="px-6 py-10 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Similar Movies</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <AnimatePresence mode="wait">
          {currentMovies.map((movie) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#121212] rounded-lg overflow-hidden shadow hover:shadow-lg hover:scale-[1.03] transition-all"
            >
              <Link to={`/movies/${movie.id}`}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={movie.title}
                  className="w-full h-[250px] object-cover"
                />
                <div className="p-2">
                  <p className="text-sm text-white font-medium text-center line-clamp-2">
                    {movie.title}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShowMore}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full transition-all shadow-md"
        >
          Show {hasNextPage ? "More" : "Less"}
        </motion.button>
      </div>
    </section>
  );
}
