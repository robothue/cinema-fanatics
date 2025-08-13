// src/components/AllMoviesPage/FiltersSidebar.jsx
import React from "react";

const FiltersSidebar = () => {
  return (
    <aside className="w-64 border border-gray-200 rounded-lg p-4">
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Genre */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Genre</h3>
        <div className="flex flex-wrap gap-2">
          {["Action", "Adventure", "Comedy", "Drama", "Sci-Fi", "Horror"].map(
            (genre) => (
              <label key={genre} className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-blue-500" />
                {genre}
              </label>
            )
          )}
        </div>
      </div>

      {/* Release Year */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Release Year</h3>
        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <option value="">All Years</option>
          {[2024, 2023, 2022, 2021].map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Language */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Language</h3>
        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <option value="">Any</option>
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </select>
      </div>

      {/* Minimum Rating */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Minimum Rating</h3>
        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
          {[10, 9, 8, 7, 6, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating}+
            </option>
          ))}
        </select>
      </div>

      {/* Sort By */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Sort By</h3>
        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <option value="rating_desc">Rating (High to Low)</option>
          <option value="rating_asc">Rating (Low to High)</option>
          <option value="year_desc">Newest First</option>
          <option value="year_asc">Oldest First</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm hover:bg-blue-600">
          Apply Filters
        </button>
        <button className="flex-1 border border-gray-300 py-2 rounded-lg text-sm hover:bg-gray-100">
          Reset
        </button>
      </div>
    </aside>
  );
};

export default FiltersSidebar;
