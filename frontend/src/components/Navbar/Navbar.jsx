import { useState, useEffect } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const heroHeight = window.innerHeight; // hero is h-screen
      // fade zone: start a little before the hero bottom, finish shortly after
      const start = heroHeight - 60;
      const end = heroHeight + 60;
      const y = window.scrollY;
      let o;
      if (y <= start) o = 0;
      else if (y >= end) o = 1;
      else o = (y - start) / (end - start);
      setOpacity(o);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bgColor = `rgba(255,255,255,${opacity})`;
  const textColor = opacity > 0.5 ? "#111" : "#fff";
  const boxShadow = opacity > 0.6 ? "0 2px 8px rgba(0,0,0,0.08)" : "none";

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      style={{ backgroundColor: bgColor, color: textColor, boxShadow }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 md:px-16 py-4 relative">
        <Logo />
        <NavLinks className="hidden md:flex" />
        <div className="flex items-center gap-4">
          <SearchBar />
          <UserMenu />
          <button className="md:hidden z-10" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="material-symbols-outlined text-[24px]">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>
      {menuOpen && <MobileMenu />}
    </nav>
  );
}
