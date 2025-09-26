import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editContent, setEditContent] = useState("");

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(`/api/tmdb/movie/${movieId}/reviews`);
        setReviews(data.slice(0, 6));
      } catch (err) {
        console.error("Failed to load reviews", err);
      }
    };
    fetchReviews();
  }, [movieId]);

  // Add new review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    const newItem = {
      author: "You",
      avatar_url: "/default-avatar.png", // Replace later with actual user
      content: newReview,
      created_at: new Date().toISOString(),
    };

    setReviews([newItem, ...reviews.slice(0, 5)]);
    setNewReview("");
  };

  // Delete review
  const handleDelete = (index) => {
    setReviews(reviews.filter((_, i) => i !== index));
  };

  // Start editing review
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditContent(reviews[index].content);
  };

  // Save edited review
  const handleSave = (index) => {
    const updated = [...reviews];
    updated[index].content = editContent;
    setReviews(updated);
    setEditingIndex(null);
    setEditContent("");
  };

  return (
    <section className="p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">User Reviews</h2>

      {/* Review input */}
      <form onSubmit={handleReviewSubmit} className="mb-10">
        <textarea
          className="w-full bg-white border border-gray-300 rounded-lg p-4 text-sm resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="Share your thoughts..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />
        <button
          type="submit"
          className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Post Review
        </button>
      </form>

      {/* Reviews grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {reviews.map((r, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl border border-gray-100 shadow p-5"
            >
              <div className="flex items-start gap-4 mb-3">
                {/* Avatar image */}
                <img
                  src={
                    r.avatar_url ||
                    "https://ui-avatars.com/api/?name=User&background=random"
                  }
                  alt={r.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">{r.author}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(r.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Review text (edit mode or normal mode) */}
              {editingIndex === index ? (
                <div>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full bg-gray-50 border rounded-lg p-3 text-sm resize-none"
                    rows={3}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleSave(index)}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingIndex(null)}
                      className="px-3 py-1 bg-gray-400 text-white text-sm rounded-lg hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 text-sm leading-relaxed">
                  {r.content.length > 200
                    ? r.content.slice(0, 200) + "..."
                    : r.content}
                </p>
              )}

              {/* Action buttons */}
              {r.author === "You" && editingIndex !== index && (
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
