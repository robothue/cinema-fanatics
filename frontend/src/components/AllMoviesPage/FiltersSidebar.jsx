// src/components/AllMoviesPage/FiltersSidebar.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react"; // 🧭 Icon for search

const FiltersSidebar = ({ filters, onFiltersChange }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(filters.search || ""); // Controlled search input

  // 🎞️ Fetch genres from TMDb dynamically
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list",
          {
            params: { api_key: "13295311bfa4f8873b35a9b719a720eb" },
          }
        );
        setGenres(res.data.genres || []);
      } catch (err) {
        console.error("❌ Failed to fetch genres:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);

  // 🧠 Debounce search (waits 500ms before triggering)
  useEffect(() => {
    const delay = setTimeout(() => {
      onFiltersChange({ search: searchInput });
    }, 500);

    return () => clearTimeout(delay);
  }, [searchInput]);

  // Generic filter change
  const handleChange = (key, value) => {
    onFiltersChange({ [key]: value });
  };

  // Reset button
  const resetFilters = () => {
    setSearchInput("");
    onFiltersChange({
      search: "",
      genres: [],
      year: "",
      language: "",
      minRating: "",
      sortBy: "rating_desc",
    });
  };

  return (
    <aside
      className="w-64 h-[calc(100vh-4rem)] sticky top-8 p-4 rounded-xl 
      bg-gradient-to-b from-black via-neutral-900 to-black border border-gray-800
      shadow-[0_0_20px_rgba(255,0,0,0.2)] hover:shadow-[0_0_25px_rgba(255,0,0,0.5)]
      transition-all duration-300 overflow-y-auto scrollbar-thin scrollbar-thumb-red-600"
    >
      {/* 🔍 Search */}
      <div className="mb-5 relative">
        <label className="block text-sm text-gray-300 mb-1">Search</label>
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search movies..."
            className="w-full pr-10 bg-neutral-800 text-white border border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all"
          />
          <Search
            size={18}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-red-600 cursor-pointer"
            onClick={() => onFiltersChange({ search: searchInput })}
          />
        </div>
      </div>

      {/* 📅 Release Year */}
      <div className="mb-5">
        <h3 className="font-semibold mb-2 text-gray-200">Release Year</h3>
        <input
          type="number"
          placeholder="e.g. 2024"
          value={filters.year}
          onChange={(e) => handleChange("year", e.target.value)}
          className="w-full bg-neutral-800 text-white border border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none"
        />
      </div>

      {/* 🌐 Language */}
      <div className="mb-5">
        <h3 className="font-semibold mb-2 text-gray-200">Language</h3>
        <select
          value={filters.language}
          onChange={(e) => handleChange("language", e.target.value)}
          className="w-full bg-neutral-800 text-white border border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none"
        >
          <option value="">Any</option>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
          <option value="hi">Hindi</option>
          <option value="ja">Japanese</option>
        </select>
      </div>

      {/* ⭐ Minimum Rating */}
      <div className="mb-5">
        <h3 className="font-semibold mb-2 text-gray-200">Minimum Rating</h3>
        <select
          value={filters.minRating}
          onChange={(e) => handleChange("minRating", e.target.value)}
          className="w-full bg-neutral-800 text-white border border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none"
        >
          <option value="">Any</option>
          {[10, 9, 8, 7, 6, 5].map((r) => (
            <option key={r} value={r}>
              {r}+
            </option>
          ))}
        </select>
      </div>

      {/* 🔽 Sort */}
      <div className="mb-5">
        <h3 className="font-semibold mb-2 text-gray-200">Sort By</h3>
        <select
          value={filters.sortBy}
          onChange={(e) => handleChange("sortBy", e.target.value)}
          className="w-full bg-neutral-800 text-white border border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none"
        >
          <option value="rating_desc">Rating (High → Low)</option>
          <option value="rating_asc">Rating (Low → High)</option>
          <option value="year_desc">Newest First</option>
          <option value="year_asc">Oldest First</option>
        </select>
      </div>

      {/* 🧹 Reset Button */}
      <div className="flex gap-2 pt-2">
        <button
          onClick={resetFilters}
          className="flex-1 bg-neutral-800 text-gray-200 border border-gray-700 py-2 rounded-lg text-sm hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200"
        >
          Reset
        </button>
      </div>
    </aside>
  );
};

export default FiltersSidebar;
