import React, { useState, useEffect } from "react";
import genreMap from "../../utils/genreMap";

const defaultFilters = {
  search: "",
  genres: [],
  year: "",
  language: "",
  minRating: "",
  sortBy: "rating_desc",
};

const FiltersSidebar = ({ filters = defaultFilters, setFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  // Sync local filters if parent updates
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Handle input/select change
  const handleChange = (key, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Handle genre checkbox change
  const handleGenreChange = (genreName) => {
    const genreId = genreMap[genreName];
    setLocalFilters((prev) => {
      const genres = prev.genres.includes(genreId)
        ? prev.genres.filter((g) => g !== genreId)
        : [...prev.genres, genreId];
      return { ...prev, genres };
    });
  };

  // Apply filters
  const applyFilters = () => {
    setFilters(localFilters);
  };

  // Reset filters
  const resetFilters = () => {
    setLocalFilters(defaultFilters);
    setFilters(defaultFilters);
  };

  return (
    <aside className="w-64 border border-gray-200 rounded-lg p-4 bg-white">
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={localFilters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Genre */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Genre</h3>
        <div className="flex flex-wrap gap-2">
          {Object.keys(genreMap).map((genreName) => (
            <label key={genreName} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="accent-blue-500"
                checked={localFilters.genres.includes(genreMap[genreName])}
                onChange={() => handleGenreChange(genreName)}
              />
              {genreName}
            </label>
          ))}
        </div>
      </div>

      {/* Release Year */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Release Year</h3>
        <select
          value={localFilters.year}
          onChange={(e) => handleChange("year", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All Years</option>
          {[2024, 2023, 2022, 2021].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Language */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Language</h3>
        <select
          value={localFilters.language}
          onChange={(e) => handleChange("language", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Any</option>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="ja">Japanese</option>
        </select>
      </div>

      {/* Minimum Rating */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Minimum Rating</h3>
        <select
          value={localFilters.minRating}
          onChange={(e) => handleChange("minRating", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Any</option>
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
        <select
          value={localFilters.sortBy}
          onChange={(e) => handleChange("sortBy", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="rating_desc">Rating (High to Low)</option>
          <option value="rating_asc">Rating (Low to High)</option>
          <option value="year_desc">Newest First</option>
          <option value="year_asc">Oldest First</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={applyFilters}
          className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm hover:bg-blue-600"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="flex-1 border border-gray-300 py-2 rounded-lg text-sm hover:bg-gray-100"
        >
          Reset
        </button>
      </div>
    </aside>
  );
};

export default FiltersSidebar;
