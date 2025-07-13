import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = ["Home", "Movies", "TV Shows", "News", "Watchlist"];

  return (
    <nav className="bg-black text-white fixed top-0 left-0 w-full z-50 shadow-md px-6 md:px-16 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-2xl font-extrabold tracking-widest">
          <span className="text-red-500">Cinema</span> <span>Fanatics</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="relative text-lg font-medium group hover:text-red-500"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 shadow-red-500/50"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="hover:text-red-500 transition">
            <Search size={22} />
          </button>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black px-6 pt-4 pb-6">
          <ul className="space-y-4 text-base font-medium">
            {navItems.map((item) => (
              <li key={item}>
                <a href="#" className="block hover:text-red-500 transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
