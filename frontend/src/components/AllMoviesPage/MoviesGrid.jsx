// src/components/AllMoviesPage/MoviesGrid.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

export default function MoviesGrid({ endpoint = "/api/tmdb/movies", currentPage = 1 }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`http://localhost:5000${endpoint}`, {
          params: { page: currentPage }
        });

        // If your backend returns results inside `results`
        setMovies(res.data.results || res.data);
      } catch (err) {
        console.error("❌ Error fetching movies:", err);
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [endpoint, currentPage]);

  if (loading) return <p className="text-center text-gray-500">Loading movies...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!movies.length) return <p className="text-center text-gray-500">No movies found.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {movies.map(movie => (
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
