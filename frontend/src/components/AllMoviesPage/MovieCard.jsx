import React from "react";
import { Link } from "react-router-dom";
import WatchlistButton from "../Buttons/watchlistButton"; // ✅ import your watchlist button

export default function MovieCard({ id, title, year, rating, posterUrl, overview }) {
  // create a simple movie object for the button
  const movie = {
    id,
    title,
    release_date: year ? `${year}-01-01` : "",
    vote_average: rating,
    poster_path: posterUrl?.replace("https://image.tmdb.org/t/p/w500", ""), // ✅ clean up URL
    genres: [],
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Poster */}
      <Link to={`/movie/${id}`}>
        <div className="h-64 bg-gray-200">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
              No Image
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-3 flex flex-col justify-between h-40">
        <div>
          <h3 className="font-semibold text-sm mb-1 line-clamp-1">{title}</h3>
          <p className="text-xs text-gray-500 mb-1">{year}</p>
          <p className="text-xs text-yellow-500 mb-2">⭐ {rating}</p>
        </div>

        <div className="flex gap-2">
          {/* ✅ Add to Watchlist button */}
                <WatchlistButton
                  tmdbId={id}
                  title={title}
                  year={year}
                  rating={rating}
                  posterUrl={posterUrl}
                  mediaType="movie"
                />


          {/* View Details */}
          <Link
            to={`/movie/${id}`}
            className="flex-1 bg-black text-white py-2 rounded-md text-sm text-center hover:bg-red-600 hover:text-yellow-200 transition-colors duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
