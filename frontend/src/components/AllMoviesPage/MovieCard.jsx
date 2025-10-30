import React from "react";
import { Link } from "react-router-dom";
import WatchlistButton from "../Buttons/watchlistButton";

export default function MovieCard({ id, title, year, rating, posterUrl, overview }) {
  const movie = {
    id,
    title,
    release_date: year ? `${year}-01-01` : "",
    vote_average: rating,
    poster_path: posterUrl?.replace("https://image.tmdb.org/t/p/w500", ""),
    genres: [],
  };

  return (
    <div className="bg-black border border-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-red-600 transition-all duration-300">
      {/* Poster */}
      <Link to={`/movie/${id}`}>
        <div className="h-64 bg-gray-900">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
              No Image
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-3 flex flex-col justify-between h-44 text-white">
        <div>
          <h3 className="font-semibold text-sm mb-1 line-clamp-1">{title}</h3>
          <p className="text-xs text-gray-400 mb-1">{year}</p>
          <p className="text-xs text-red-500 mb-2">⭐ {rating}</p>
          <p className="text-xs text-gray-400 line-clamp-2">{overview}</p>
        </div>

        <div className="flex gap-2 mt-2">
          <WatchlistButton
            tmdbId={id}
            title={title}
            year={year}
            rating={rating}
            posterUrl={posterUrl}
            mediaType="movie"
          />

          <Link
            to={`/movie/${id}`}
            className="flex-1 bg-black border border-gray-700 text-white py-2 rounded-md text-sm text-center hover:bg-red-600 hover:text-yellow-200 transition-all duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
