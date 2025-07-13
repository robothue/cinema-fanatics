import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import FeaturedMovies from "../components/FeaturedMovies";
import TrendingNow from "../components/TrendingNow";
import FansFavourite from "../components/FansFavourite";
import ActionMovies from "../components/ActionMovies";
import GenreFilters from "../components/GenreFilters";
import Newsletter from "../components/Newsletter";
import TVShows from "../components/TVShows";
import Footer from "../components/Footer";


export default function Home() {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-white text-black">
      <Navbar />
      <HeroSection />
      <FeaturedMovies />
      <TrendingNow />
      <FansFavourite />
      <ActionMovies />
      <GenreFilters />
      {/* <TVShows /> */}
      <Newsletter />
      <Footer />
      
    </div>
  );
}
