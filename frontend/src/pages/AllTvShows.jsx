// src/pages/AllTvShows.jsx
import React from "react";
import FiltersSidebar from "../components/AllMoviesPage/FiltersSidebar"; // reusing from movies
import FeaturedGenres from "../components/AllMoviesPage/FeaturedGenres"; // reusing from movies
import TvShowsGrid from "../components/AllTvShowsPage/TvShowsGrid";
import PaginationControls from "../components/AllMoviesPage/PaginationControls"; // reusing from movies

const AllTvShows = () => {
  return (
    <div className="flex gap-6 px-6 py-8 bg-white">
      <FiltersSidebar />
      <main className="flex-1">
        <FeaturedGenres />
        <TvShowsGrid />
        <PaginationControls />
      </main>
    </div>
  );
};

export default AllTvShows;
