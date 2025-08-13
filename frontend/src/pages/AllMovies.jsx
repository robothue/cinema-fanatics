// src/pages/AllMovies.jsx
import React from "react";
import FiltersSidebar from "../components/AllMoviesPage/FiltersSidebar";
import FeaturedGenres from "../components/AllMoviesPage/FeaturedGenres";
import MoviesGrid from "../components/AllMoviesPage/MoviesGrid";
import PaginationControls from "../components/AllMoviesPage/PaginationControls";

const AllMovies = () => {
  return (
    <div className="flex gap-6 px-6 py-8 bg-white">
      <FiltersSidebar />
      <main className="flex-1">
        <FeaturedGenres />
        <MoviesGrid />
        <PaginationControls />
      </main>
    </div>
  );
};

export default AllMovies;
