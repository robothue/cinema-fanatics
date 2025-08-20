import { useState } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md px-6 md:px-16 py-4 text-black">
      <div className="flex items-center justify-between max-w-7xl mx-auto relative">
        <Logo />
        <NavLinks className="hidden md:flex" />
        <div className="flex items-center gap-4">
          <SearchBar />
          <UserMenu />
          {/* Mobile menu button */}
          <button
            className="md:hidden z-10"
            onClick={() => setMenuOpen(!menuOpen)}
          >
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
