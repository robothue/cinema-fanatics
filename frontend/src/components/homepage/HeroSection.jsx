import { useEffect, useState } from "react";
import axios from "axios";

export default function HeroSection() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/api/tmdb/featured")
      .then((res) => setMovies(res.data))
      .catch((err) => console.error("Failed to fetch featured movies", err));
  }, []);

  // Rotate movie every 30 seconds
  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [movies]);

  const movie = movies[currentIndex];
  if (!movie) return null;

  return (
    <section className="relative w-full h-[90vh] text-white overflow-hidden transition-all duration-1000">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        {/* Fade overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 md:px-16 py-32 md:py-40">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-md">
          {movie.title}
        </h1>
        <p className="text-sm md:text-base text-gray-200 max-w-xl mb-6 line-clamp-3 drop-shadow-sm">
          {movie.overview}
        </p>

        <div className="flex gap-4">
          <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md font-semibold shadow-md transition">
            Watch Now
          </button>
          <button className="border border-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:text-black transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
