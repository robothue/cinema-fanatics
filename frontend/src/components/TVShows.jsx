import { useEffect, useState } from "react";
import axios from "axios";

export default function TVShows() {
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/movies") // Adjust to your API
      .then(res => {
        const all = res.data;

        // Option A: Use actual TV shows if available
        // const tv = all.filter(movie => movie.media_type === "tv");

        // Option B: Fallback – just simulate with middle 6 items
        const start = Math.floor(all.length / 3);
        const fallbackTV = all.slice(start, start + 6);

        setTvShows(fallbackTV);
      })
      .catch(err => console.error("TVShows fetch error:", err));
  }, []);

  return (
    <section className="bg-white text-black py-14 px-6 md:px-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">TV Shows</h2>
        <a href="#" className="text-sm text-red-600 hover:underline">See More</a>
      </div>

      {tvShows.length === 0 ? (
        <p className="text-gray-500">No TV shows available at the moment.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {tvShows.map((show) => (
            <div
              key={show.id}
              className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-2">
                <h3 className="text-sm font-semibold truncate">{show.title}</h3>
                <p className="text-xs text-gray-500">{show.release_date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
