// src/components/MovieDetail/WatchProviders.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function WatchProviders({ id }) {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    async function fetchProviders() {
      try {
        const { data } = await axios.get(`/api/tmdb/movie/${id}/providers`);
        // Adjust country code here if needed
        setProviders(data.results?.KE || data.results?.US || null);
      } catch (err) {
        console.error("Failed to fetch watch providers", err);
      }
    }

    fetchProviders();
  }, [id]);

  if (!providers) return null;

  const renderProviderRow = (title, list) => {
    if (!list || list.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
        <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600">
          {list.map((provider) => (
            <div key={provider.provider_id} className="flex flex-col items-center">
              <img
                src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                alt={provider.provider_name}
                className="w-12 h-12 object-contain mb-1"
              />
              <span className="text-xs text-gray-300 text-center">
                {provider.provider_name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">Where to Watch</h2>

      {renderProviderRow("Streaming", providers.flatrate)}
      {renderProviderRow("Buy", providers.buy)}
      {renderProviderRow("Rent", providers.rent)}
    </section>
  );
}
