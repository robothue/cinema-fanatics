// src/components/AllTvShowsPage/TvShowCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function TvShowCard({ id, title, year, rating, posterUrl, overview }) {
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
      <div className="p-3 flex flex-col justify-between h-36">
        <div>
          <h3 className="font-semibold text-sm mb-1 line-clamp-1">{title}</h3>
          <p className="text-xs text-gray-500 mb-1">{year}</p>
          <p className="text-xs text-yellow-500">⭐ {rating}</p>
        </div>

        <Link
          to={`/tv/${id}`}
          className="mt-2 w-full bg-black text-white py-2 rounded-md text-sm text-center 
                     hover:bg-red-600 hover:text-yellow-200 transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
