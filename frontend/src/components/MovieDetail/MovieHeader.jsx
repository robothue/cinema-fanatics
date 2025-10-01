import { Star, Play } from "lucide-react";
import axios from "axios";
import { useState } from "react";

export default function MovieHeader({ movie }) {
  const {
    id,
    title,
    release_date,
    runtime,
    genres,
    vote_average,
    overview,
    poster_path,
    spoken_languages,
    original_language,
  } = movie;

  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const year = release_date?.split("-")[0];
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  const language =
    spoken_languages?.[0]?.english_name || original_language?.toUpperCase();

  // Certification placeholder
  const certification = "PG-13";

  const handleAddToWatchlist = async () => {
    try {
      await axios.post("http://localhost:5000/api/watchlist", {
        userId: "123", // dummy user
        tmdbId: movie.id,
        title: movie.title,
        year: movie.release_date?.split("-")[0],
        rating: movie.vote_average,
        posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        genre: movie.genres?.map(g => g.name) || [],
        watched: false,
      });
      alert("✅ Added to watchlist!");
    } catch (err) {
      console.error("Failed to add to watchlist:", err);
      alert("❌ Already in watchlist or error occurred.");
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md overflow-hidden p-4 md:p-6">
      {/* Poster */}
      <div className="w-full md:w-1/3 max-w-[200px] mx-auto md:mx-0">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className="rounded-xl w-full object-cover shadow-lg"
        />
      </div>

      {/* Info Section */}
      <div className="md:ml-6 mt-4 md:mt-0 flex-1 text-gray-900 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Title */}
          <h1 className="text-3xl font-bold leading-tight">
            {title}
            <span className="text-gray-500 text-xl font-normal ml-2">
              ({year})
            </span>
          </h1>

          {/* Runtime & Language & Certification */}
          <p className="text-sm text-gray-600">
            {hours}h {minutes}m • {language} • {certification}
          </p>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 text-xs">
            {genres?.map((g) => (
              <span
                key={g.id}
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full"
              >
                {g.name}
              </span>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2 text-yellow-500 text-sm font-semibold">
            <Star fill="currentColor" className="w-4 h-4" />
            <span>{vote_average?.toFixed(1)} / 10</span>
          </div>

          {/* Overview */}
          <p className="text-sm text-gray-800 line-clamp-3 leading-relaxed">
            {overview}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-3 flex-wrap">
          <button
            onClick={handleAddToWatchlist}
            disabled={adding || added}
            className={`${
              added
                ? "bg-green-600 hover:bg-green-500"
                : "bg-indigo-600 hover:bg-indigo-500"
            } transition text-white text-sm px-4 py-2 rounded-lg font-semibold shadow-sm disabled:opacity-70`}
          >
            {added ? "✓ Added" : adding ? "Adding..." : "+ Add to Watchlist"}
          </button>
          <button className="flex items-center gap-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition text-sm px-4 py-2 rounded-lg font-semibold shadow-sm">
            <Play size={16} />
            Watch Trailer
          </button>
        </div>
      </div>
    </div>
  );
}
