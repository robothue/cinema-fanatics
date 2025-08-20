import { Link } from "react-router-dom";

const navItems = [
  { label: "HOME", path: "/" },
  { label: "MOVIES", path: "/movies" },
  { label: "TV SHOWS", path: "/shows" },
  { label: "NEWS", path: "/news" },
  { label: "WATCHLIST", path: "/watchlist" },
];

export default function NavLinks({ className = "" }) {
  return (
    <ul className={`items-center gap-10 text-sm font-semibold tracking-wider ${className}`}>
      {navItems.map((item) => (
        <li key={item.label}>
          <Link to={item.path} className="hover:text-red-600 transition">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
