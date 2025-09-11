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
  const { media_type, id } = useParams(); // 👈 expects route like /movie/:id or /tv/:id
  const [item, setItem] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/api/tmdb/${media_type}/${id}`);
        const data = res.data;

        // Normalize movie vs TV fields
        const normalized = {
          ...data,
          title: data.title || data.name, // 🎬 movies use title, 📺 tv uses name
          release_date: data.release_date || data.first_air_date,
        };

        setItem(normalized);
      } catch (err) {
        console.error("❌ Error fetching details:", err);
      }
    }

    if (id && media_type) fetchData();
  }, [id, media_type]);

  if (!item) return <div className="text-center text-white p-8">Loading...</div>;

  return (
    <div className="w-screen bg-white text-black min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column: poster + basic info */}
        <div className="md:col-span-1">
          <MovieHeader movie={item} />
        </div>

        {/* Right column: plot, cast, providers, etc. */}
        <div className="md:col-span-2 space-y-8">
          <MovieOverview overview={item.overview} />
          <YouTubeTrailer movieId={item.id} movieTitle={item.title} />
          <CastList cast={item.credits?.cast || []} />
          <Reviews movieId={id} /> {/* 🔧 later update to support TV reviews too */}
          <SimilarMovies movies={item.similar?.results || []} />
          {/* If you want providers for TV too */}
          {/* <WatchProviders id={id} mediaType={media_type} /> */}
        </div>
      </div>
    </div>
  );
}
