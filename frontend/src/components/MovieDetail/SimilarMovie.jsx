// src/components/SimilarMovies.jsx
import { Link } from "react-router-dom";

export default function SimilarMovies({ movies }) {
  return (
    <section className="p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Similar Movies</h2>
      <div className="flex overflow-x-auto gap-4">
        {movies.slice(0, 10).map((m) => (
          <Link
            key={m.id}
            to={`/movies/${m.id}`}
            className="min-w-[150px] bg-gray-800 rounded-lg p-2 hover:scale-105 transition"
          >
            <img
              src={
                m.poster_path
                  ? `https://image.tmdb.org/t/p/w200${m.poster_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={m.title}
              className="rounded mb-1"
            />
            <p className="text-xs text-center">{m.title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
