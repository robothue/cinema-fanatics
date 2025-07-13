import { useEffect, useState } from "react";
import axios from "axios";

export default function FeaturedMovies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const MOVIES_PER_PAGE = 6;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.error("FeaturedMovies error:", err));
  }, []);

  const totalPages = Math.ceil(movies.length / MOVIES_PER_PAGE);
  const start = page * MOVIES_PER_PAGE;
  const currentMovies = movies.slice(start, start + MOVIES_PER_PAGE);

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    } else {
      setPage(0); // Loop back to start
    }
  };

  return (
    <section className="bg-white text-black py-14 px-6 md:px-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">
        Featured Movies
      </h2>

      {/* Row of 6 Movies + See More */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4 md:gap-6">
        {currentMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition group overflow-hidden"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
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
          </div>
        ))}

        {/* See More Card */}
        <div className="flex items-center justify-center border border-dashed border-red-500 rounded-md hover:bg-red-50 transition cursor-pointer">
          <button
            onClick={handleNext}
            className="text-red-600 font-semibold text-sm md:text-base"
          >
            See More
          </button>
        </div>
      </div>
    </section>
  );
}
