import useMovies from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const { movies, loading } = useMovies();

  if (loading) return <p className="text-center mt-10">Loading movies...</p>;

  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map(movie => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
  );
}
