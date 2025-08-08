export default function CastList({ cast }) {
  if (!cast || cast.length === 0) return null;

  return (
    <section className="px-4 md:px-6 py-6 max-w-6xl mx-auto">
      <h2 className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-4">
        Top Cast
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {cast.slice(0, 10).map((actor) => (
          <div
            key={actor.id}
            className="flex flex-col items-center bg-white rounded-2xl p-4 shadow-sm"
          >
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : "https://via.placeholder.com/100x150?text=No+Image"
              }
              alt={actor.name}
              className="w-20 h-20 rounded-full object-cover mb-2 border border-gray-300"
            />
            <p className="text-sm font-medium text-gray-900 text-center line-clamp-1">
              {actor.name}
            </p>
            <p className="text-xs text-gray-500 text-center line-clamp-2">
              {actor.character}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
