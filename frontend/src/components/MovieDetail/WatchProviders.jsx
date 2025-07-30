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

export default function WatchProviders({ id }) {
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
    <section className="p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">Where to Watch</h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600">
        {providers.map((provider) => {
          const colorClass =
            providerColors[provider.provider_name] || "border-gray-600";
          const tooltip = `${provider.provider_name} - ${provider.type}`;

          return (
            <a
              key={provider.provider_id}
              href={provider.display_priority < 10 ? `https://www.google.com/search?q=${provider.provider_name}+watch` : "#"}
              target="_blank"
              rel="noopener noreferrer"
              title={tooltip}
              className="flex flex-col items-center text-center"
            >
              <img
                src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                alt={provider.provider_name}
                className={`w-12 h-12 object-contain mb-1 rounded-full border-2 ${colorClass}`}
              />
              <span className="text-xs text-gray-300">{provider.provider_name}</span>
              <span className="text-[10px] text-gray-400 capitalize">{provider.type}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
