// src/components/AllTvShowsPage/TvShowsGrid.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import TvShowCard from "./TvShowCard";

export default function TvShowsGrid({ endpoint = "/api/tmdb/tv", currentPage = 1 }) {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTvShows = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`http://localhost:5000${endpoint}`, {
          params: { page: currentPage }
        });

        setTvShows(res.data.results || res.data);
      } catch (err) {
        console.error("❌ Error fetching TV shows:", err);
        setError("Failed to load TV shows.");
      } finally {
        setLoading(false);
      }
    };

    fetchTvShows();
  }, [endpoint, currentPage]);

  if (loading) return <p className="text-center text-gray-500">Loading TV shows...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!tvShows.length) return <p className="text-center text-gray-500">No TV shows found.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {tvShows.map(show => (
        <TvShowCard
          key={show.id}
          id={show.id}
          title={show.name}
          year={show.first_air_date?.split("-")[0] || "N/A"}
          rating={show.vote_average?.toFixed(1) || "N/A"}
          posterUrl={
            show.poster_path
              ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
              : null
          }
          overview={show.overview}
        />
      ))}
    </div>
  );
}
