import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HeroSection() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/tmdb/featured")
      .then((res) => setMovies(res.data))
      .catch((err) => console.error("Failed to fetch featured movies", err));
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, 30000);
    return () => clearInterval(interval);
  }, [movies]);

  const movie = movies[currentIndex];
  if (!movie) return null;

  return (
    <section className="relative w-full h-[90vh] text-white overflow-hidden transition-all duration-1000">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 md:px-16 py-32 md:py-40">
        {/* Tag */}
        <span className="inline-block bg-red-600 px-3 py-1 rounded-full text-xs font-semibold mb-3 shadow-md">
          {movie.tag}
        </span>

        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-md">
          {movie.title || movie.name}
        </h1>
        <p className="text-sm md:text-base text-gray-200 max-w-xl mb-6 line-clamp-3 drop-shadow-sm">
          {movie.overview}
        </p>
        <p className="text-xs md:text-sm text-gray-400 mb-4">
          {movie.release_date || movie.first_air_date}
        </p>

        <div className="flex gap-4">
          {/* Watch Now → Navigate to Watch Providers */}
          {/* Watch Now → Watch Providers */}
<button
  onClick={() =>
    navigate(`/watch/${movie.media_type || (movie.title ? "movie" : "tv")}/${movie.id}`)
  }
  className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md font-semibold shadow-md transition"
>
  Watch Now
</button>

{/* Learn More → MovieDetail (movie or tv) */}
<button
  onClick={() =>
    navigate(`/${movie.media_type || (movie.title ? "movies" : "tv")}/${movie.id}`)
  }
  className="border border-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:text-black transition"
>
  Learn More
</button>

        </div>
      </div>
    </section>
  );
}
