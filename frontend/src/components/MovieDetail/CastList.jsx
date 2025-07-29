// src/components/MovieDetail/CastList.jsx
export default function CastList({ cast }) {
    if (!cast || cast.length === 0) return null;
  
    return (
      <section className="p-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-white mb-4">Top Cast</h2>
  
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {cast.slice(0, 10).map((actor) => (
            <div
              key={actor.id}
              className="flex flex-col items-center bg-red-600 rounded-lg p-4 shadow"
            >
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : "https://via.placeholder.com/100x150?text=No+Image"
                }
                alt={actor.name}
                className="w-24 h-24 rounded-full object-cover mb-2 border-2 border-gray-700"
              />
              <p className="text-white text-sm font-medium text-center line-clamp-1">
                {actor.name}
              </p>
              <p className="text-gray-400 text-xs text-center line-clamp-2">
                {actor.character}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  