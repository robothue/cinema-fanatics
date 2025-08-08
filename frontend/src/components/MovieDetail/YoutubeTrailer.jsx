import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import WatchProviders from "./WatchProviders";

const YouTubeTrailer = ({ movieId, movieTitle }) => {
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const { data } = await axios.get(`/api/tmdb/movie/${movieId}/videos`);
        const trailer = data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (err) {
        console.error("Error fetching trailer:", err.message);
      }
    };

    fetchTrailer();
  }, [movieId]);

  if (!trailerKey) return null;

  return (
    <motion.section
      key="trailer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-6xl mx-auto mt-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Section Title */}
      <h2 className="text-2xl font-bold mb-4 text-white text-center">🎬 Watch Trailer</h2>

      {/* YouTube Trailer */}
      <div className="aspect-video w-full rounded-xl overflow-hidden shadow-md bg-black border border-gray-800">
        <iframe
          title="Movie Trailer"
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      {/* Watch Providers Section */}
      <div className="mt-6">
        <WatchProviders id={movieId} />
      </div>
    </motion.section>
  );
};

export default YouTubeTrailer;
