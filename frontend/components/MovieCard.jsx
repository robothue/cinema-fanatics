export default function MovieCard({ movie }) {
  const { poster_path, title, release_date, genres, overview } = movie;

  const shortPlot = overview?.length > 100 ? overview.slice(0, 100) + "..." : overview;
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "/fallback.jpg";

  return (
    <div className="bg-white shadow-md rounded overflow-hidden hover:shadow-lg transition">
      <div className="h-64 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          onError={(e) => {
            e.target.src = "/fallback.jpg";
            e.target.onerror = null;
          }}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">
          {release_date?.slice(0, 4)} · {Array.isArray(genres) ? genres.join(", ") : genres}
        </p>
        {shortPlot && <p className="text-sm text-gray-600">{shortPlot}</p>}
      </div>
    </div>
  );
}
