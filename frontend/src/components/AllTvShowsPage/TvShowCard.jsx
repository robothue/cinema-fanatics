import React from "react";
import { Link } from "react-router-dom";
import WatchlistButton from "../Buttons/watchlistButton"; // ✅ Import the Watchlist button

export default function TvShowCard({ id, title, year, rating, posterUrl }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Poster */}
      <Link to={`/tv/${id}`}>
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
          <p className="text-xs text-yellow-500">⭐ {rating}</p>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          {/* ✅ Watchlist Button */}
          <WatchlistButton
            tmdbId={id}
            title={title}
            year={year}
            rating={rating}
            posterUrl={posterUrl}
            mediaType="tv"
          />


          {/* View Details */}
          <Link
            to={`/tv/${id}`}
            className="w-full bg-black text-white py-2 rounded-md text-sm text-center 
                       hover:bg-red-600 hover:text-yellow-200 transition-colors duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
