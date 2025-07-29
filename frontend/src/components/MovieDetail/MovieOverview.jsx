// src/components/MovieOverview.jsx
export default function MovieOverview({ overview }) {
    return (
      <section className="p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-2">Overview</h2>
        <p className="text-gray-900">{overview}</p>
      </section>
    );
  }
  