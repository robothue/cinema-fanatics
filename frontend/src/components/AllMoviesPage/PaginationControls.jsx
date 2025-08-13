// src/components/AllMoviesPage/PaginationControls.jsx
import React from "react";

const PaginationControls = () => {
  return (
    <div className="flex justify-center items-center gap-3 mt-6">
      <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100">
        Previous
      </button>
      <span className="px-3 py-1 bg-blue-500 text-white rounded-lg">1</span>
      <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100">
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
