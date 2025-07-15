import HeroSection from "../components/homepage/HeroSection";
import Navbar from "../components/homepage/Navbar";
import FeaturedMovies from "../components/homepage/FeaturedMovies";
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
      <HeroSection />
      <TrendingNow />
      <FeaturedMovies />
      <FansFavourite />
      <ActionMovies />
      <GenreFilters />
      <TVShows />
      <Newsletter />
      <Footer />
      
    </div>
  );
}
