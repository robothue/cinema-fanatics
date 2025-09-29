import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function FeaturedMovies() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const perPage = 6;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tmdb/featured")
      .then((res) => setItems(res.data))
      .catch((err) =>
        console.error("❌ Failed to fetch featured content:", err)
      );
  }, []);

  // ✅ Safer: floor ensures equal number of pages
  const totalPages = Math.floor(items.length / perPage);
  const handleSeeMore = () => {
    setPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const displayed = items.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="px-6 md:px-16 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Featured
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4">
        <AnimatePresence mode="wait">
          {displayed.map((item) => {
            const title = item.title || item.name; // 🎬 movies → title, 📺 tv → name
            const releaseDate = item.release_date || item.first_air_date;
            const mediaType = item.media_type || (item.tag?.includes("TV") ? "tv" : "movie");

            return (
              <motion.div
                key={`${mediaType}-${item.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded shadow-md hover:shadow-xl transition overflow-hidden group"
              >
                <Link to={`/${mediaType}/${item.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-2">
                    <h3 className="text-sm font-semibold truncate group-hover:text-red-600 transition-colors">
                      {title}
                    </h3>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
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
          <div className="flex items-center justify-center rounded-lg">
            {/* <button
              onClick={handleSeeMore}
              className="w-full h-full bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold px-4 py-2 rounded-md shadow-md hover:scale-105 hover:shadow-lg transition"
            > */}
            <button
              onClick={handleSeeMore}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg shadow-md hover:shadow-xl transition"
            >
              See More →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
