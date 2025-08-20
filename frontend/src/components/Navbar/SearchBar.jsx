import { useState, useRef, useEffect } from "react";

export default function SearchBar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef(null);

  const handleSearchToggle = () => {
    setSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleBlur = () => setSearchOpen(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="relative flex items-center" style={{ width: "160px", height: "36px" }}>
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
  );
}
