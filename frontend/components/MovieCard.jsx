export default function MovieCard({ movie }) {
    return (
      <div className="bg-white shadow rounded overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="h-64 w-full object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{movie.title}</h3>
          <p className="text-sm text-gray-500">{movie.year} · {movie.genres?.join(', ')}</p>
        </div>
      </div>
    );
  }
  