import { useEffect, useState } from "react";
import axios from "axios";

const providerColors = {
  Netflix: "border-red-500",
  "Amazon Prime Video": "border-yellow-400",
  "Disney Plus": "border-blue-400",
  "Apple TV": "border-gray-300",
  "HBO Max": "border-purple-500",
  Showmax: "border-teal-400",
  YouTube: "border-red-600",
};

export default function WatchProviders({ id, movieTitle }) {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    async function fetchProviders() {
      try {
        const { data } = await axios.get(`/api/tmdb/movie/${id}/providers`);
        const region = data.results?.KE || data.results?.US || null;

        if (region) {
          const allProviders = [];

          ["flatrate", "buy", "rent"].forEach((type) => {
            if (region[type]) {
              region[type].forEach((p) => {
                allProviders.push({ ...p, type });
              });
            }
          });

          const uniqueProviders = Array.from(
            new Map(allProviders.map((p) => [p.provider_id, p])).values()
          );

          const sortedProviders = uniqueProviders.sort(
            (a, b) => a.display_priority - b.display_priority
          );

          setProviders(sortedProviders.slice(0, 5));
        } else {
          setProviders(null);
        }
      } catch (err) {
        console.error("Failed to fetch watch providers", err);
        setProviders(null);
      }
    }

    fetchProviders();
  }, [id]);

  if (!providers || providers.length === 0) return null;

  return (
    <section className="px-4 max-w-6xl mx-auto">
      <h2 className="text-lg font-semibold text-white mb-2">Available On</h2>

      <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
        {providers.map((provider) => {
          const colorClass =
            providerColors[provider.provider_name] || "border-gray-600";

          return (
            <a
              key={provider.provider_id}
              href={`https://www.google.com/search?q=${provider.provider_name}+watch`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center text-center flex-shrink-0 w-20"
              title={`${provider.provider_name} - ${provider.type}`}
            >
              <img
                src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                alt={provider.provider_name}
                className={`w-12 h-12 object-contain rounded-full border-2 ${colorClass} mb-1`}
              />
              <span className="text-xs text-gray-300 truncate">
                {provider.provider_name}
              </span>
            </a>
          );
        })}

        {/* MovieBox Button */}
        <a
          href={`https://movieboxpro.app/search?q=${encodeURIComponent(
            movieTitle || "movie"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 w-20 h-20 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md transition"
        >
          MovieBox
        </a>
      </div>
    </section>
  );
}
