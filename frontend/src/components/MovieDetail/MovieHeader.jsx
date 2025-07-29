import { Star } from "lucide-react";

export default function MovieHeader({ movie }) {
  const {
    title,
    release_date,
    runtime,
    genres,
    vote_average,
    overview,
    poster_path,
  } = movie;

  const year = release_date?.split("-")[0];
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const genreList = genres?.map((g) => g.name).join(", ");

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md text-white">
      {/* Movie Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title}
        className="rounded-xl w-full mb-4"
      />

      {/* Movie Info */}
      <div className="space-y-1">
        <h1 className="text-lg font-semibold leading-snug">{title}</h1>
        <p className="text-xs text-gray-900">
          {year} • {hours}h {minutes}m • {genreList}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-400 text-sm">
          <Star fill="currentColor" className="w-4 h-4" />
          <span>{vote_average?.toFixed(1)}</span>
        </div>

        {/* Short Overview */}
        <p className="text-gray-900 text-sm line-clamp-4">{overview}</p>

        {/* Watchlist Button */}
        <button className="mt-3 w-full bg-indigo-600 text-sm py-2 rounded-lg font-medium hover:bg-indigo-500 transition">
          + Add to Watchlist
        </button>
      </div>
    </div>
  );
}
