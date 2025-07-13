import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-white text-black">
      <Navbar />
      <HeroSection />
      <main className="pt-24">
        <section className="text-center py-32 px-4">
          <h1 className="text-4xl font-bold">
            Welcome to <span className="text-red-600">Cinema Fanatics</span>
          </h1>
          <p className="text-gray-600 mt-4">
            Your ultimate movie platform.
          </p>
        </section>
      </main>
    </div>
  );
}
