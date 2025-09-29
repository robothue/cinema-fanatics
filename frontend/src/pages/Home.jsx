import HeroSection from "../components/homepage/HeroSection";
import Navbar from "../components/Navbar/Navbar";
import FeaturedMedia from "../components/homepage/FeaturedMovies"; // refactored
import TrendingNow from "../components/homepage/TrendingNow";
import FansFavourite from "../components/homepage/FansFavourite";
import ActionMovies from "../components/homepage/ActionMovies";
import GenreFilters from "../components/homepage/GenreFilters";
import Newsletter from "../components/homepage/Newsletter";
import TVShows from "../components/homepage/TVShows";
import Footer from "../components/homepage/Footer";

export default function Home() {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-white text-black">
      <Navbar />
      <HeroSection />           {/* 🎬 Featured mix (movies + tv) */}
      <TrendingNow />           {/* 🔥 Movies trending (later: movies + tv) */}
      <FeaturedMedia />         {/* 🌟 Showcase from featured */}
      <FansFavourite />         {/* ❤️ Highest rated */}
      <ActionMovies />          {/* 💥 Genre: Action */}
      <GenreFilters />          {/* 🎭 User chooses genre */}
      <TVShows />               {/* 📺 Popular TV */}
      <Newsletter />
      <Footer />
    </div>
  );
}
