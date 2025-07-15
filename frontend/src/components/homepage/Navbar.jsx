import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef(null);

  const navItems = ["HOME", "MOVIES", "TV SHOWS", "NEWS", "WATCHLIST"];

  const handleSearchToggle = () => {
    setSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleBlur = () => {
    setSearchOpen(false);
  };

  // Close search input on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md px-6 md:px-16 py-4 text-black">
      <div className="flex items-center justify-between max-w-7xl mx-auto relative">
        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-wider">
          <span className="text-red-600">CINEMA</span>{" "}
          <span className="text-black">FANATICS</span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-10 text-sm font-semibold tracking-wider">
          {navItems.map((item) => (
            <li key={item}>
              <a href="#" className="hover:text-red-600 transition">
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Side: Search, Account, Mobile */}
        <div className="flex items-center gap-4">
          {/* Search Expand Area */}
          <div
            className="relative flex items-center"
            style={{ width: "160px", height: "36px" }}
          >
            <div
              className={`absolute right-0 top-1/2 -translate-y-1/2 h-full flex items-center border border-gray-300 rounded-full bg-white overflow-hidden transition-all duration-300 ease-in-out ${
                searchOpen ? "w-full px-4" : "w-20 justify-center"
              }`}
            >
              {searchOpen ? (
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search..."
                  onBlur={handleBlur}
                  className="w-full h-full bg-transparent text-sm outline-none"
                />
              ) : (
                <button
                  onClick={handleSearchToggle}
                  className="text-gray-500 text-sm font-medium hover:text-red-600 transition"
                >
                  Search
                </button>
              )}
            </div>
          </div>

          {/* Account Icon */}
          <button className="p-1.5 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition">
            <span className="material-symbols-outlined text-[22px]">
              account_circle
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden z-10" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="material-symbols-outlined text-[24px]">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white px-6 pt-4 pb-6 text-sm font-semibold tracking-wider">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item}>
                <a href="#" className="block hover:text-red-600 transition">
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
