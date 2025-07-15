import { useEffect, useState } from "react";
import axios from "axios";

export default function FeaturedMovies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const perPage = 6;

  useEffect(() => {
    console.log("🔄 useEffect triggered");
    axios
      .get("http://localhost:5000/api/tmdb/featured")
      .then((res) => {
        console.log("✅ Fetched movies:", res.data);
        setMovies(res.data);
      })
      .catch((err) =>
        console.error("❌ Failed to fetch featured movies:", err)
      );
  }, []);

  const totalPages = Math.ceil(movies.length / perPage);
  const handleSeeMore = () => {
    setPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const displayed = movies.slice(
    page * perPage,
    page * perPage + perPage
  );

  return (
    <section className="px-6 md:px-16 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Featured Movies
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4">
        {displayed.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded shadow-md hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto"
            />
            <div className="p-2">
              <h3 className="text-sm font-semibold line-clamp-1">
                {movie.title}
              </h3>
            </div>
          </div>
        ))}

        {/* 7th Card: See More Button */}
        <div className="flex items-center justify-center">
          <button
            onClick={handleSeeMore}
            className="w-full h-full bg-red-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            See More →
          </button>
        </div>
      </div>
    </section>
  );
}
