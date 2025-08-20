// src/components/Layout.jsx
//This one is for the whole pages layout
import Navbar from "./Navbar/Navbar";
import Newsletter from "./homepage/Newsletter";
import Footer from "./homepage/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-white text-black">
      <Navbar />
      <main className="pt-16"> {/* optional padding if your Navbar is fixed */}
        <Outlet /> {/* this renders the current page */}
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}
