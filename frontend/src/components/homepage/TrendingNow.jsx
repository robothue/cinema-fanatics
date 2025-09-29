import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function TrendingNow() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tmdb/trending")
      .then((res) => {
        // Sort by popularity, works for both movies & TV
        const sorted = res.data.sort((a, b) => b.popularity - a.popularity);
        setItems(sorted);
      })
      .catch((err) => console.error("TrendingNow error:", err));
  }, []);

  // ✅ Loop through pages without showing fewer items
  const totalPages = Math.floor(items.length / ITEMS_PER_PAGE);
  const start = page * ITEMS_PER_PAGE;
  const currentItems = items.slice(start, start + ITEMS_PER_PAGE);

  const handleNext = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  return (
    <section className="bg-white text-black py-14 px-6 md:px-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">
        Trending Now
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4 md:gap-6">
        <AnimatePresence mode="wait">
          {currentItems.map((item) => {
            const title = item.title || item.name; // 🎬 movies use title, 📺 tv uses name
            const releaseDate = item.release_date || item.first_air_date;
            const mediaType =
              item.media_type || (item.first_air_date ? "tv" : "movie");

            return (
              <motion.div
                key={`${mediaType}-${item.id}`}
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
                  to={`/${mediaType}/${item.id}`}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden block"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={title}
                    className="w-full h-48 object-cover transition-transform duration-300"
                  />
                  <div className="p-2">
                  <h3 className="text-sm font-semibold truncate group-hover:text-red-600 transition-colors">
                      {title}
                    </h3>
                    <div className="flex justify-between text-[11px] md:text-xs text-gray-500 mt-1">
                      <span>⭐ {item.vote_average?.toFixed(1) || "N/A"}</span>
                      <span>{releaseDate?.slice(0, 4) || "—"}</span>
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
