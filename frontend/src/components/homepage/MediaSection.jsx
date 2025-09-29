import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function MediaSection({
  title,
  fetchUrl,
  filterFn = (items) => items, // default: no filter
  sortFn = null, // default: no sorting
  itemsPerPage = 6,
}) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    axios
      .get(fetchUrl)
      .then((res) => {
        let results = res.data;

        // apply filter if provided
        results = filterFn(results);

        // apply sorting if provided
        if (sortFn) {
          results = results.sort(sortFn);
        }

        setItems(results);
      })
      .catch((err) => console.error(`${title} fetch error:`, err));
  }, [fetchUrl, title, filterFn, sortFn]);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const start = page * itemsPerPage;
  const currentItems = items.slice(start, start + itemsPerPage);

  const handleNext = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  return (
    <section className="bg-white text-black py-14 px-6 md:px-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">
        {title}
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-500">No {title} available at the moment.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4 md:gap-6">
          <AnimatePresence mode="wait">
            {currentItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition group overflow-hidden"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-2">
                  <h3 className="text-xs md:text-sm font-semibold truncate">
                    {item.title || item.name}
                  </h3>
                  <div className="flex justify-between text-[11px] md:text-xs text-gray-500 mt-1">
                    <span>
                      ⭐ {item.vote_average ? item.vote_average.toFixed(1) : "N/A"}
                    </span>
                    <span>{item.release_date || item.first_air_date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* See More */}
          <div className="flex items-center justify-center border border-dashed border-red-500 rounded-md hover:bg-red-50 transition cursor-pointer">
            <button
              onClick={handleNext}
              className="text-red-600 font-semibold text-sm md:text-base"
            >
              See More
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
