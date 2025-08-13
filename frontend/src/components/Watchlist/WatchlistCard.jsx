export default function WatchlistCard({ movie, onRemove }) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-200">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-3 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="font-semibold text-sm mb-1 line-clamp-1">{movie.title}</h3>
            <p className="text-xs text-gray-500 mb-1">{movie.year}</p>
            <p className="text-xs text-yellow-500 font-medium">⭐ {movie.rating}</p>
          </div>
          <button
            onClick={() => onRemove(movie.id)}
            className="mt-3 w-full bg-red-500 text-white text-sm font-semibold px-3 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
          >
            Remove from Watchlist
          </button>
        </div>
      </div>
    );
  }
  