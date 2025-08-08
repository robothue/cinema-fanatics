export default function MovieOverview({ overview }) {
  return (
    <section className="px-4 md:px-6 py-6 max-w-4xl mx-auto">
      <h2 className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">
        Overview
      </h2>
      <p className="text-sm text-gray-800 leading-relaxed">{overview}</p>
    </section>
  );
}
