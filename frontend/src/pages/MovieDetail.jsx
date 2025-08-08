import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import MovieHeader from "../components/MovieDetail/MovieHeader";
import MovieOverview from "../components/MovieDetail/MovieOverview";
import CastList from "../components/MovieDetail/CastList";
import WatchProviders from "../components/MovieDetail/WatchProviders";
import SimilarMovies from "../components/MovieDetail/SimilarMovie";
import Reviews from "../components/MovieDetail/Reviews";
import YouTubeTrailer from "../components/MovieDetail/YoutubeTrailer";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/api/tmdb/movie/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error("❌ Error fetching movie:", err);
      }
    }

    if (id) fetchData();
  }, [id]);

  if (!movie) return <div className="text-center text-white p-8">Loading...</div>;

  return (
    <div className="w-screen bg-white text-black min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column: poster + basic info */}
        <div className="md:col-span-1">
          <MovieHeader movie={movie} />
        </div>

        {/* Right column: plot, cast, providers, etc. */}
        <div className="md:col-span-2 space-y-8">
          <MovieOverview overview={movie.overview} />
          <YouTubeTrailer movieId={movie.id} movieTitle={movie.title} />
          {/* <WatchProviders id={id} /> */}
          <CastList cast={movie.credits.cast} />
          <Reviews movieId={id} />
          <SimilarMovies movies={movie.similar.results} />
        </div>
      </div>
    </div>
  );
}
