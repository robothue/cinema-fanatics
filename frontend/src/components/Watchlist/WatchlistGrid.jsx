import WatchlistCard from "./WatchlistCard";

export default function WatchlistGrid({ movies, onRemove }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map(movie => (
        <WatchlistCard key={movie.id} movie={movie} onRemove={onRemove} />
      ))}
    </div>
  );
}
