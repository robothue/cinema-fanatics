// src/components/AllMoviesPage/MoviesGrid.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import MovieCard from "./MovieCard";

export default function MoviesGrid({ filters, endpoint = "/api/tmdb/movies" }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // ✅ Determine backend route
  const getEndpoint = () => {
    if (filters.search) return "/api/tmdb/search/movie";
    if (filters.genres?.length > 0) return "/api/tmdb/discover";
    return endpoint;
  };

  // ✅ Convert sort options
  const convertSortOption = (option) => {
    switch (option) {
      case "rating_desc":
        return "vote_average.desc";
      case "rating_asc":
        return "vote_average.asc";
      case "year_desc":
        return "primary_release_date.desc";
      case "year_asc":
        return "primary_release_date.asc";
      default:
        return "popularity.desc";
    }
  };

  // 🎬 Fetch movies
  const fetchMovies = async (pageToLoad = 1, append = false) => {
    setLoading(true);
    setError(null);

    try {
      const route = getEndpoint();
      const params = { page: pageToLoad };

      // ✅ Add filters dynamically
      if (filters.search) params.query = filters.search;
      if (filters.genres?.length > 0)
        params.with_genres = filters.genres.join(",");
      if (filters.year) params.primary_release_year = filters.year;
      if (filters.language) params.language = filters.language;
      if (filters.minRating) params["vote_average.gte"] = filters.minRating;
      if (filters.sortBy) params.sort_by = convertSortOption(filters.sortBy);

      const res = await axios.get(`http://localhost:5000${route}`, { params });
      const results = res.data.results || res.data || [];

      setMovies((prev) =>
        append
          ? [
              ...prev,
              ...results.filter((m) => !prev.some((p) => p.id === m.id)),
            ]
          : results
      );

      // ✅ Check pagination
      setHasMore(results.length >= 20 && pageToLoad < (res.data.total_pages || 500));
    } catch (err) {
      console.error("❌ Error fetching movies:", err);
      setError("Failed to load movies.");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Refetch on filters change
  useEffect(() => {
    setMovies([]);
    setPage(1);
    fetchMovies(1, false);
  }, [filters, endpoint]);

  // 🔘 Load more handler
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage, true);
  };

  // 🧠 Render logic
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!loading && !movies.length)
    return <p className="text-center text-gray-500">No movies found.</p>;

  return (
    <div className="flex flex-col items-center">
      {/* 🎥 Movie Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies
          .filter((movie) => movie.id && movie.title)
          .map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              year={(movie.release_date || "").slice(0, 4)}
              rating={movie.vote_average?.toFixed(1)}
              posterUrl={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : null
              }
              overview={movie.overview}
            />
          ))}
      </div>

      {/* 🔘 Load More */}
      {hasMore && (
        <button
          onClick={handleLoadMore}
          disabled={loading}
          className="mt-6 px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-black transition-all"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
