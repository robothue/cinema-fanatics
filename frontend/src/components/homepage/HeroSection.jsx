import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion"; // animations
import { Play, Info } from "lucide-react"; // icons

export default function HeroSection() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tmdb/featured")
      .then((res) => setMovies(res.data))
      .catch((err) => console.error("Failed to fetch featured movies", err));
  }, []);

  useEffect(() => {
    if (!movies || movies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    }, 30000);
    return () => clearInterval(interval);
  }, [movies]);

  const movie = movies[currentIndex];
  if (!movie) return null;

  return (
    <section className="relative w-full h-screen min-h-[100vh] text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-5xl px-6 md:px-16 pt-40 md:pt-56">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Tag */}
          <span className="inline-block bg-red-600/90 px-3 py-1 rounded-full text-xs font-semibold mb-4 shadow-md tracking-wide uppercase">
            Featured
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-xl tracking-tight">
            {movie.title || movie.name}
          </h1>

          {/* Extra info */}
          <div className="flex items-center gap-4 text-sm md:text-base text-gray-300 mb-6">
            <span>⭐ {movie.vote_average?.toFixed(1)}/10</span>
            <span>{movie.release_date || movie.first_air_date}</span>
            {movie.original_language && (
              <span className="uppercase">{movie.original_language}</span>
            )}
          </div>

          {/* Overview */}
          <p className="text-sm md:text-lg text-gray-200 max-w-2xl mb-8 line-clamp-4 drop-shadow-md">
            {movie.overview}
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            
            {/* <button
              onClick={() =>
                navigate(
                  `/watch/${
                    movie.media_type || (movie.title ? "movie" : "tv")
                  }/${movie.id}`
                )
              }
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold shadow-lg transition"
            >
              <Play size={20} /> Watch Now
            </button> */}

            <button
              onClick={() =>
                navigate(
                  `/${
                    movie.media_type || (movie.title ? "movie" : "tv")
                  }/${movie.id}`
                )
              }
              className="flex items-center gap-2 bg-red-600 border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition"
            >
              <Play size={20} /> Watch Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
