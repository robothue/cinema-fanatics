import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

export default function MoviesGrid({
  filters,
  endpoint = "/api/tmdb/movies",
  currentPage = 1,
}) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`http://localhost:5000${endpoint}`, {
          params: { page: currentPage },
        });

        let data = res.data.results || res.data;

        // 🔎 Apply filters client-side
        if (filters.search) {
          data = data.filter((m) =>
            m.title.toLowerCase().includes(filters.search.toLowerCase())
          );
        }

        if (filters.genres.length > 0) {
          data = data.filter((m) =>
            m.genre_ids?.some((id) => filters.genres.includes(id))
          );
        }

        if (filters.year) {
          data = data.filter(
            (m) =>
              m.release_date &&
              m.release_date.startsWith(filters.year.toString())
          );
        }

        if (filters.language) {
          data = data.filter((m) => m.original_language === filters.language);
        }

        if (filters.minRating) {
          data = data.filter(
            (m) => m.vote_average >= Number(filters.minRating)
          );
        }

        if (filters.sortBy) {
          data = [...data].sort((a, b) => {
            switch (filters.sortBy) {
              case "rating_desc":
                return b.vote_average - a.vote_average;
              case "rating_asc":
                return a.vote_average - b.vote_average;
              case "year_desc":
                return (
                  new Date(b.release_date).getFullYear() -
                  new Date(a.release_date).getFullYear()
                );
              case "year_asc":
                return (
                  new Date(a.release_date).getFullYear() -
                  new Date(b.release_date).getFullYear()
                );
              default:
                return 0;
            }
          });
        }

        setMovies(data);
      } catch (err) {
        console.error("❌ Error fetching movies:", err);
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [endpoint, currentPage, filters]);

  if (loading)
    return <p className="text-center text-gray-500">Loading movies...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!movies.length)
    return <p className="text-center text-gray-500">No movies found.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          year={movie.release_date?.split("-")[0] || "N/A"}
          rating={movie.vote_average?.toFixed(1) || "N/A"}
          posterUrl={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : null
          }
          overview={movie.overview}
        />
      ))}
    </div>
  );
}
