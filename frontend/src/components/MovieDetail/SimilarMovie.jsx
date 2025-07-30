// src/components/SimilarMovies.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function SimilarMovies({ movies }) {
  const [page, setPage] = useState(0);
  const pageSize = 5;

  const startIndex = page * pageSize;
  const currentMovies = movies.slice(startIndex, startIndex + pageSize);
  const hasNextPage = startIndex + pageSize < movies.length;

  const handleShowMore = () => {
    setPage((prev) => (hasNextPage ? prev + 1 : 0));
  };

  return (
    <section className="p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Similar Movies</h2>

      <div className="grid grid-cols-6 gap-4 items-start">
        <AnimatePresence mode="wait">
          {currentMovies.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="col-span-1"
            >
              <Link
                to={`/movies/${m.id}`}
                className="block rounded-lg hover:scale-105 transition-transform"
              >
                <img
                  src={
                    m.poster_path
                      ? `https://image.tmdb.org/t/p/w200${m.poster_path}`
                      : "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={m.title}
                  className="rounded w-full h-[225px] object-cover"
                />
                <p className="text-xs text-white text-center mt-1 line-clamp-2">
                  {m.title}
                </p>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div
          key="show-more"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="col-span-1 flex justify-center items-center"
        >
          <button
            onClick={handleShowMore}
            className="bg-black hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Show {hasNextPage ? "More" : "Less"}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
