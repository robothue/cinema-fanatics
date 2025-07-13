import { useEffect, useState } from "react";
import axios from "axios";

export default function HeroSection() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/api/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.error("Hero fetch error:", err));
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 30000);

    return () => clearInterval(interval);
  }, [movies]);

  if (movies.length === 0) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const featured = movies[currentIndex];
  const imageUrl = `https://image.tmdb.org/t/p/original${featured.backdrop_path}`;

  return (
    <section
      className="relative w-full h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-40 z-10 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 flex items-center h-full">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-xl space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              {featured.title}
            </h1>
            <p className="text-sm md:text-base text-gray-200">
              {featured.overview}
            </p>
            <div className="flex gap-4 pt-2">
              <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full font-medium transition">
                Watch Now
              </button>
              <button className="border border-white hover:bg-white hover:text-black px-6 py-2 rounded-full font-medium transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
