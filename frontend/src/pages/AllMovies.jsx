// src/pages/AllMovies.jsx
import React, { useState } from "react";
import FiltersSidebar from "../components/AllMoviesPage/FiltersSidebar";
import FeaturedGenres from "../components/AllMoviesPage/FeaturedGenres";
import MoviesGrid from "../components/AllMoviesPage/MoviesGrid";
import PaginationControls from "../components/AllMoviesPage/PaginationControls";

const AllMovies = () => {
  const [filters, setFilters] = useState({
    search: "",
    genres: [],
    year: "",
    language: "",
    minRating: "",
    sortBy: "rating_desc",
  });

  // (Optional) Callback for when filters apply
  const handleResults = (newFilters) => {
    console.log("Filters applied:", newFilters);
    setFilters(newFilters); // keeps parent in sync
  };

  return (
    <div className="flex gap-6 px-6 py-8 bg-white">
       <FiltersSidebar
        filters={filters}
        onFiltersChange={(newFilters) =>
          setFilters((prev) => ({ ...prev, ...newFilters }))
        }
      />
      <main className="flex-1">
        <FeaturedGenres />
        <MoviesGrid filters={filters} />
        <PaginationControls />
      </main>
    </div>
  );
};

export default AllMovies;
