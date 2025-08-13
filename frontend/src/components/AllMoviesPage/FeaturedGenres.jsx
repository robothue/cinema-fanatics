// src/components/AllMoviesPage/FeaturedGenres.jsx
import React from "react";

const FeaturedGenres = () => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {["Action", "Comedy", "Drama", "Sci-Fi", "Horror", "Animation", "Romance"].map(
        (genre) => (
          <span
            key={genre}
            className="px-3 py-1 border border-gray-300 rounded-full text-sm cursor-pointer hover:bg-blue-500 hover:text-white"
          >
            {genre}
          </span>
        )
      )}
    </div>
  );
};

export default FeaturedGenres;
